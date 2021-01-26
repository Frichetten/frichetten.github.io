---
title: "Intercept SSM Agent Communications"
date: 2021-01-23T00:00:40-06:00
description: Research on post-exploitation techniques against SSM Agent abusing send-command and start-session.
link: ssm-agent-tomfoolery
image: https://frichetten.com/images/thumbs/ssm-agent-tomfoolery
type: "blog"
---
The following is some research I've done on leveraging SSM Agent communications for post-exploitation. Please note, I am not claiming that these are vulnerabilities within the SSM Agent.

Due to how the SSM Agent handles authentication, if you can get access to the IAM credentials of an EC2 instance you can intercept SSM messages and sessions. This means even a low privilege user can intercept these communications. While this is not necessarily a novel idea (this is literally how the SSM Agent works), I had not seen anyone leveraging this for malicious purposes (please let me know if I'm missing prior research).

With this article I'd like to explain how someone could intercept these communications, alter them, or prevent the owner from accessing the EC2 instance entirely. Additionally this may help explain how parts of the SSM Agent operate on a low level.

As always, proof of concept scripts can be found [here](https://github.com/Frichetten/ssm-agent-research).

## Intercept Messages

If you've ever intercepted the traffic of the [SSM Agent](https://github.com/aws/amazon-ssm-agent), you'll notice that it will constantly call ec2messages:GetMessages. By default the agent will do this constantly, keeping the connection open for approximately 20 seconds. During this 20 second interval, the agent is listening for messages. If it receives one, such as when someone calls [ssm:SendCommand](https://docs.aws.amazon.com/cli/latest/reference/ssm/send-command.html), it will receive the message via this open connection.

This behavior introduces an interesting question. If I get code execution on the EC2 instance (or otherwise get access to its IAM creds) could we do this ourselves and listen for messages? Well, yes.