---
title: "Intercept SSM Agent Communications"
date: 2021-01-23T00:00:40-06:00
description: Research on post-exploitation techniques against SSM agent abusing send-command and start-session.
link: ssm-agent-tomfoolery
image: https://frichetten.com/images/thumbs/ssm-agent-tomfoolery
type: "blog"
---
The following is some research I've done on leveraging SSM Agent communications for post-exploitation. Please note, I am not claiming that these are vulnerabilities within the SSM Agent or with how AWS implements this technology. The ability to intercept/disrupt these communications is a result of the design, and I'm not sure of a better way to do this short of implementing it in the hypervisor itself. For penetration testers and red teamers it's worth knowing that you can snoop on these communications and for defenders it's worth knowing that someone can prevent you from running commands on your EC2 hosts.

## What is the SSM Agent
[SSM Agent](https://github.com/aws/amazon-ssm-agent) is an executable that runs on EC2 instances which allows you to execute commands remotely.