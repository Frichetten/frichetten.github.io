---
title: "Enumerate AWS API Permissions Without Logging to CloudTrail"
date: 2020-09-11T00:00:40-06:00
description: Writeup for a bug I discovered in the AWS API that would allow you to enumerate certain permissions for a role without logging to CloudTrail.
link: aws-api-enum-vuln
image: https://frichetten.com/images/thumbs/abusing-aws-connection-tracking
type: "blog"
---
The following is a technical writeup for a bug I found in the AWS API that allows you to enumerate certain permissions for a role without logging to CloudTrail. It affects 645 different API actions across 40 different AWS services. This would be beneficial for a Penetration Tester or a Red Teamer to enumerate what permissions the role or user they've compromised has access to without alerting the blue team as no logs are generated in CloudTrail.

This article is split into two parts. The first being a quick summary as to how the vulnerability could be exploited. The second being an explanation of the discovery and technical analysis.

Full PoC and scripts are available [here](https://github.com/Frichetten/aws_stealth_perm_enum).

## What Is Vulnerable
The vulnerability allows you to enumerate if a given role has permission to call an AWS API action without logging to CloudTrail under specific conditions.

1. The AWS service uses the JSON 1.1 protocol.
2. The API action returns a unique error code depending on the permission set.
3. The resource associated with that action is set to "*".

## Manual Steps to Exploit
The vulnerability affects certain AWS services that use POST requests and the X-Amz-Target header (Each AWS API uses different protocol types. Some use GET requests, some POST to an API endpoint, etc.). The majority of these services require the Content-Type header to be 'application/x-amz-json-1.1'. In the majority of instances, sending 'application/x-amz-json-1.0' will provide you with an error; typically 404 - 'UnknownOperationException' or 500 - 'InternalFailure'.

However, on the services with vulnerable API calls you get a 403 response if you did not have permission to call the API. If the role did have permission to call the API you instead get a 404. Because these are technically "malformed" requests, none of this traffic is sent to CloudTrail. This means you can enumerate whether or not a given role has privileges to make the API call without that reconnaissance being logged. It is important to note that you would only get a 404 response if the role had permission to make that API call, and if the resource was set to '*'. 

To see this in action, if you make a call to secretsmanager:ListSecrets, while setting the Content-Type header to 'application/x-amz-json-1.0' you would get a 403 response.

<center><img src="/images/blog/aws-api-enum-vuln/403.png" loading="lazy" alt="403 Response if you did not have permissions" /></center><br>

However, if we modify the role doing the reconnaissance, and provide the following policy, we get a 404 response indicating we have permission to make this call without logging to CloudTrail.

<center><img src="/images/blog/aws-api-enum-vuln/policy.png" loading="lazy" alt="Setting a policy" /></center><br>

<center><img src="/images/blog/aws-api-enum-vuln/404.png" loading="lazy" alt="404 Response if you did have permission to make the API call" /></center><br>

Note: Not all actions can be enumerated based on the 403/404 error code. Please read on for a more detailed explanation and edge cases.

## Discovery
The process of finding this vulnerability took many turns and led me down many rabbit holes before I realized what I had. 

What started the search? As a part of my talk for [ShellCon](https://shellcon.io/talks/2020/hacking-aws/) I started putting together what I would consider the major themes of attacking AWS along with some of my own research. One thing stuck out to me - the need to be able to identify a set of access keys without logging to CloudTrail. While attacking AWS it is not uncommon to come upon AWS credentials without knowing what role/user they are associated with. 

Previously, there was a method by abusing sdb:ListDomains which did not support CloudTrail. Unfortunately, in August of 2020 it gained CloudTrail support and thus it could not be used in an OPSEC safe manor.

<center><img src="/images/blog/aws-api-enum-vuln/conversation.png" loading="lazy" alt="Conversation talking about sdb:ListDomains" /></center><br>

As a result of this I started searching for API calls that could be used to identify what role you were running as without logging to CloudTrail (I did eventually find this in a much less dramatic location [[tweet](https://twitter.com/Frichette_n/status/1304481375056203776?s=20)]). I was particularly confident I would find one because a lot of AWS services will inform you via an error the name and account id of the role that is making the call. I just needed to find one that didn't show up in CloudTrail.

After going through a ton of actions manually, I eventually moved on to targeting the AWS console. For those not aware, there can be undocumented API's used by the console which may provide extra capabilities (Rhino Security has a good [blog post](https://rhinosecuritylabs.com/aws/escalating-aws-iam-privileges-undocumented-codestar-api/) describing how they abused an undocumented API to escalate privileges in an AWS account).

From there I started my hunt. Eventually I stumbled into a Macie API that did not show up in the AWS documentation, macie:DescribeMacieAccountDetails.

<center><img src="/images/blog/aws-api-enum-vuln/macieaccountdetails.png" loading="lazy" alt="Macie Describe Account Details" /></center><br>

In order to call this reliably and test more, I used the [AWS API signing examples](https://docs.aws.amazon.com/general/latest/gr/sigv4-signed-request-examples.html) to make things easier. Every API call in AWS must be signed using a specific format and using their template examples is definitely recommended.

Sure enough, if you did not have permission to make the API call you would get a 400 response which included the calling role!

<center><img src="/images/blog/aws-api-enum-vuln/400_response.png" loading="lazy" alt="400 Response" /></center><br>

Success! Our goal of being able to enumerate our calling identity without logging to CloudTrail worked. I started getting curious, however. What would happen if I attempted to provide an action that didn't exist? You would get a 400 - "UnknownOperationException". And this is where the magic happened.

I got interested in the Content-Type header. As shown above, the specified header is 'application/x-amz-json-1.1'. This header is really important as deviating from it would give you a similar error to if you had provided a non-existent action. I knew other API's in the AWS library made use of 'application/x-amz-json-1.0', however, and I wondered how that would work. The response was strange. When providing an action that did not exist and modifying the Content-Type header you would get a 403 instead of the 400.

<center><img src="/images/blog/aws-api-enum-vuln/weird_macie.png" loading="lazy" alt="Weird Macie" /></center><br>

Did you notice what was weird about that? By specifying a different Content-Type header I not only got a different response code, I also got it to return the calling role while specifying an invalid action. This made me wonder, what If I chose a Macie API that would normally log to CloudTrail. If I set that different Content-Type header would it log? As a result I chose the macie:ListMemberAccounts action and I tested it.

Sure enough it was not logged to CloudTrail and I got a 403 response. The next thought was, "Okay, what happens if the role had permission to make that call, what is the response?". I gave it the IAM permission to do so and re-ran the script.

<center><img src="/images/blog/aws-api-enum-vuln/macie-with.png" loading="lazy" alt="404 Response" /></center><br>

Dang, I was really hoping it would provide the content. Finding a way to make an API call that returned content without logging to CloudTrail would have been a holy grail. Saddened, I stood at my desk for a few minutes. Something was here, I just couldn't put my finger on it. What about this was weird? These response codes didn't correlate to each other.

I drew a little chart on some scratch paper and stared at it.

| IAM Permissions | Content-Header | Response Code | CloudTrail Log |
| --------------- | -------------- | ------------- | -------------- |
| Has Permission | 1.0 | 404 | No CloudTrail |
| Has Permission | 1.1 | 200 | Yes CloudTrail |
| No Permission | 1.0 | 403 | No CloudTrail |
| No Permission | 1.1 | 400 | Yes CloudTrail |

<br>

The chart really spells out the vulnerability. If I used the 1.0 header, I would get a different response code depending on if I had the permission or not! The reason this is a big deal is because, typically, if you need to enumerate your permissions you'd need to use a tool like [enumerate-iam](https://github.com/andresriancho/enumerate-iam) which brute-forces API calls and reports which ones worked. The problem with that of course is that you'll fill up CloudTrail with tons of logs, and a defender could spot you. With this, I could make the determination if a role had a certain permission without logging to CloudTrail!

This is where things got a little more complicated. I knew this worked for certain API calls in Macie, but what about other API families? I quickly stumbled upon Secrets Manager which was also vulnerable. My next question was, "Does this work for specific resources? If a role has permissions to read a specific secret, can I make that determination?".

The short answer is no. For whatever reason, setting a specific ARN in a IAM policy would not trigger the vulnerability. It would return a 403 response. The vulnerability would only ever trigger if the resource of the policy was set to "\*". I theorize that in the process of validating the request setting a "\*" in the policy skips some step in the validation (Note: I have no concrete evidence of this).

Now that I had some criteria for how the vulnerability worked, I needed to figure out all the possible API calls which could be vulnerable. It is important to note that just because one call in an AWS service was vulnerable, that did not mean every call was. Taking Kinesis for example; kinesis:ListStreams would work, but kinesis:ListShards did not. To be more specific anytime the "application/x-amz-json-1.0" header was used with kinesis:ListShards I would get a 500 response. Regardless of if we had the permission or not.

So, how does one go about testing every single AWS API call for a specific vulnerability?

## Scaling Up
The method for doing this came from an unexpected place. The enumerate-iam tool I mentioned above has a feature where it can update itself by reading in the AWS API definition from an AWS GitHub repo. I took a page from that book, and created a [script](https://github.com/Frichetten/aws_stealth_perm_enum/blob/master/enum_all_api_calls/enumerate_vuln_apis.py) that would programmatically call every AWS API that used the JSON 1.1 protocol. I then ran this script twice, once with a role that had NO permissions, and once with a role that had \*:\*. The script would capture the response code, the service name, action, and a hash of the response body.

I then compared these two outputs and checked for situations in which the response codes were different. Additionally, I later discovered a handful of services that would return the same response code regardless of the permissions but would have a different response body (thus I used the hash to compare them).

After comparing my output to CloudTrail to ensure none were showing up, I had a full list of APIs that did not get logged to CloudTrail. That list was composed of 645 unique API calls across 40 different AWS services which were:

|     |     |
| --- | --- |
| application-autoscaling | appstream | 
| athena | autoscaling-plans | 
| aws-marketplace | cloudhsm | 
| codecommit | codepipeline | 
| codestar | comprehend | 
| cur | datapipeline | 
| dax | directconnect | 
| discovery | forecast |
| gamelift | health | 
| identitystore | kinesis | 
| kinesisanalytics | macie | 
| mediastore | mgh | 
| mturk-requester | opsworks-cm | 
| personalize | redshift-data | 
| route53domains | route53resolver | 
| sagemaker | secretsmanager | 
| shield | sms | 
| snowball | support | 
| tagging | textract | 
| translate | workmail |

<br>

## Proof of Concept
As a result of this work I created a proof of concept which would test all of these vulnerable APIs and determine if the calling role had permission to use them. Let's use the following policy and test the PoC.

<center><img src="/images/blog/aws-api-enum-vuln/iam_policy.png" loading="lazy" alt="IAM policy" /></center><br>

<center><img src="/images/blog/aws-api-enum-vuln/output.png" loading="lazy" alt="Proof of Concept Output" /></center><br>

And did any of that show up in CloudTrail?

<center><img src="/images/blog/aws-api-enum-vuln/cloudtrail_out.png" loading="lazy" alt="Output of CloudTrail" /></center><br>

As you can see from the screenshot, after waiting 30 minutes none of our detected permissions were logged to CloudTrail (look at the timestamps).

## AWS Response
I reached out to the AWS Security team on September 2nd. They were very polite and easy to work with (shoutout to Krishanu and Zack). After some digging on their side and reproducing the issue, they ultimately determined it was not a vulnerability. While I understand their position, I disagree with the conclusion. To my mind, one of the hardest parts about attacking AWS infrastructure is finding what permissions you have available to a role you've compromised. You can use tools to brute-force these permissions however that's a very noisy process and is likely to trip alerts (which is a good thing). Because of this bug, an adversary can enumerate whether they have hundreds of API permissions without causing any alerting on the defenders side. It's free enumeration which would otherwise provide an opportunity for them to be caught.
