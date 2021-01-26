---
title: "Intercept SSM Agent Communications"
date: 2021-01-23T00:00:40-06:00
description: Research on post-exploitation techniques against SSM Agent abusing send-command and start-session.
link: ssm-agent-tomfoolery
image: https://frichetten.com/images/thumbs/ssm-agent-tomfoolery
type: "blog"
---
The following is some research I've done on leveraging SSM Agent communications for post-exploitation. Please note, I am not claiming that these are vulnerabilities within the SSM Agent.

Due to how the SSM Agent handles authentication, if you can get access to the IAM credentials of an EC2 instance you can intercept EC2 messages and SSM sessions. This means even a low privilege user can intercept these communications. While this is not necessarily a novel idea (this is literally how the SSM Agent works), I had not seen anyone leveraging this for malicious purposes (please let me know if I'm missing prior research).

With this article I'd like to explain how someone could intercept these communications, alter them, or prevent the owner from accessing the EC2 instance entirely. Additionally this may help explain how parts of the SSM Agent operate on a low level.

As always, proof of concept scripts can be found [here](https://github.com/Frichetten/ssm-agent-research).

## Intercept EC2 Messages

If you've ever intercepted the traffic of the [SSM Agent](https://github.com/aws/amazon-ssm-agent), you'll notice that it will constantly call ec2messages:GetMessages. By default the agent will do this constantly, keeping the connection open for approximately 20 seconds. During this 20 second interval, the agent is listening for messages. If it receives one, such as when someone calls [ssm:SendCommand](https://docs.aws.amazon.com/cli/latest/reference/ssm/send-command.html), it will receive the message via this open connection.

This behavior introduces an interesting question. If I get code execution on the EC2 instance (or otherwise get access to its IAM creds) could we do this ourselves and listen for messages? Well, yes.

We can call ec2messages:GetMessages on our own, and this will allow us to intercept EC2 messages coming to the instance. There is a slight problem though. The SSM Agent will make these connections approximately every 20 seconds. What happens if there are two competing connections? AWS will only respond to the connection that is the "newest". As a result, if the SSM Agent goes first, we can create a new connection on top of it and intercept the message.

We can ensure we have the newest connection (or very close to it) by repeatedly opening new connections over and over again. Through this method, we ensure that we will always be the newest one, and ensure we can intercept EC2 messages. To test this idea, I created a simple [proof of concept](https://github.com/Frichetten/ssm-agent-research/tree/main/ssm-send-command-interception) that will listen for send-command messages and steal the command.

<center><img src="/images/blog/ssm-agent-tomfoolery/intercept_message.png" loading="lazy" alt="Showing the interception of an SSM message" /></center><br>

Another nice feature of this is that we can reply with whatever response we'd like. For example we provide a 'Success' and supply whatever output we'd like. Here is an example from the proof of concept.

<center><img src="/images/blog/ssm-agent-tomfoolery/modified_output.png" loading="lazy" alt="Showing us set arbitrary output" /></center><br>

## Intercept SSM Sessions

The implementation of EC2 messages is a relatively simple polling design. You simply check if you have a message, perform the action, and respond. Unfortunately SSM Sessions are much more complicated. This involves multiple web socket connections, a unique binary protocol, and more. The following is a summation of the relevant concepts.

Shortly after the SSM Agent starts up, it will create a WebSocket connection back to AWS. This connection is the control channel, and is responsible for listening for connections. When a user tries to start an SSM session ([ssm:StartSession](https://docs.aws.amazon.com/cli/latest/reference/ssm/start-session.html)), the control channel will receive the request and will spawn a data channel. The data channel is responsible for the actual communication from the user to the EC2 instance. 

The actual communication that takes place between the clients is a binary protocol specifically for this purpose. Thanks fully, the source code for the SSM Agent is available [here](https://github.com/aws/amazon-ssm-agent), and we can just look up the specification for it. It looks something like [this](https://github.com/aws/amazon-ssm-agent/blob/21c85d674bbb44dd13cd8738d1b9d86658a6b18e/agent/session/contracts/agentmessage.go#L73).

<center><img src="/images/blog/ssm-agent-tomfoolery/format.png" loading="lazy" alt="Showing the binary format" /></center><br>

