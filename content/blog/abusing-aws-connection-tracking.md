---
title: "Abusing AWS Connection Tracking"
date: 2020-08-08T00:00:40-06:00
description: Tunnel out of restricted security groups by abusing connection tracking.
link: abusing-aws-connection-tracking
image: https://frichetten.com/images/thumbs/abusing-aws-connection-tracking
type: "blog"
---
If you've ever taken a training course for the AWS Certified Solutions Architect you've likely had it drilled into your mind that [security groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html) are "stateless". What does that mean exactly? It means that, for example, if an EC2 instance makes an outbound request to a web server the response traffic is allowed back through the security group regardless of the configuration of the inbound rules. Similarly, if your EC2 instance receives inbound traffic it is allowed to respond regardless of the outbound rules. This capability is enabled by [connection tracking](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html#security-group-connection-tracking).

So far that sounds pretty reasonable, but in this post I'd like to describe a methodology for penetration testers, red teamers, and cloud malware (is that a thing yet?) to persist connections on a host, even when a more restrictive security group is put in place.

## Practical Example

Lets take a real world scenario. You, as a bad actor, gain code execution on an EC2 instance in FriendCo's VPC. You poke around a bit over a [basic reverse shell](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet). Maybe steal some credentials, escalate privileges, exfil data, etc. Eventually you trigger some kind of alert. Defenders (either automated or human) are on their way to ruin your fun. If they are following the [AWS whitepaper on incident response](https://d1.awsstatic.com/whitepapers/aws_security_incident_response.pdf), they will likely change the security group on the EC2 instance to one that doesn't allow any inbound or outbound traffic. This process is typically automated using something like a [CloudWatch Event Rule](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html) to automatically box you in. The good news for you is that even though the security group has been changed you still have access.

Based on that last sentence you're either very confused, or you think that's common knowledge. If you're in the prior camp let's talk about it.

## Abusing Connection Tracking

Due to connection tracking, so long as you have established an outbound connection before the security group change your connection will persist. This is because of the difference of untracked vs tracked connections. Untracked connections are immediately stopped when the security group is changed, whereas tracked connections are not interrupted. 

Taking SSH for example; if you SSH into an EC2 instance, and then change to a restrictive security group, your connection will either persist or be dropped depending on the original inbound rule.

| Original Inbound Rule | Changed Rule To | Dropped/Not Dropped |
| --------------------- | --------------- | ------------------- |
| 0.0.0.0/0 | No Inbound | Dropped |
| x.x.x.x/32 | No Inbound | Not Dropped |

<br>

Because of this behavior, if we establish a connection outbound prior to a security group change over, our connection will be maintained.

<center><img src="/images/blog/abusing-aws-connection-tracking/restrictive-rule.png" loading="lazy" alt="Showing the restrictive rule" /></center><br>

<center><img src="/images/blog/abusing-aws-connection-tracking/still-here.png" loading="lazy" alt="Still here!" /></center><br>

Something to keep in mind is that this is dealing with TCP connections. If you're using a beaconing C2, your traffic won't make it off the system and you will be locked out. While that may or may not be a deal breaker for you depending on the tooling and techniques you are employing, I do think it's worth keeping in your tool belt. By maintaining access via this method that gives you additional opportunities to seek out privilege escalation, steal the IAM keys, or potentially engage in hijinks such as sending messages to the forensics analyst's terminal when they log in. Or you could always just disable/uninstall the SSM agent and SSH. :)

## How Do We Prevent This?

The short answer is that we would use [NACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html). There are some shortcomings with this however. The first being that NACLs operate at the subnet layer, meaning that any changes you make will effect all other EC2 instances in the subnet. If this is a business critical application it would be hard to justify setting a deny rule on all outbound traffic. You could block the attacker IP address, however you may not find this immediately, or it may require manual interaction and response which makes it hard to automate.

If you'd like to learn more about exploitation of the cloud check out [Hacking the Cloud](https://hackingthe.cloud?pk_campaign=con-tracking-blog), an encyclopedia of the tactics, techniques, and procedures attackers can use in the cloud (Work in progress, please treat as such).