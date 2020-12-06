# SSH

随着 Windows10 集成了 Open ssh. SSH 的简单总结有必要来一下。

## Why we need SSH

- [TTY](https://en.wikipedia.org/wiki/Tty_(unix))?

    [Teleprinter](https://en.wikipedia.org/wiki/Teleprinter)

    [The TTY demystified](http://www.linusakesson.net/programming/tty/index.php)

    不严谨的说话，TTY 就是终端。terminal。

- [Docker command example](https://docs.docker.com/v17.12/edge/engine/reference/commandline/container_exec/#description)

    `--tty , -t	Allocate a pseudo-TTY`

- How to remote?
SSH?

- SSH without tty

Most command don't need TTY to work.

[More details]:(https://askubuntu.com/questions/716682/remote-ssh-command-requires-a-terminal)

``` bash
    ssh host_test ls
    ssh host_test bash
```

- SSH with tty

``` bash
    ssh host_test
    ssh -t host_test "vi text.txt"
    ssh -t host_test top
```

- SSH through proxy

```plain
ssh root@domain.com -p 22  -o "ProxyCommand=nc -X connect -x 127.0.0.1:10801 %h %p" 

or window version

ssh root@domain.com -p 22  -o "ProxyCommand=C:\Program Files (x86)\Nmap\ncat.exe --verbose --proxy-type http --proxy 127.0.0.1:10801 %h %p"
```

## How SSH work

![SSH0](./data/SSH0.jpg)

## Authentications

```plain
PasswordAuthentication yes
PubkeyAuthentication yes
```

### PasswordAuthentication

和 HTTPS（SSL）加密算法很像。 然而怎么保证 server 的 public key 不被替换呢（第一次连接时候）？ 你要自己对自己的 known_hosts 负责。SSL 有浏览器内置的 CA 来校验 server public 是不是正确的。 Use `SSH -v` or `SSH -vvv`观察下连接过程。

1. When an SSH server is initialized, it creates a host key, which is a public/private keypair. The SSH server gives out the public key to anyone who connects to it.
2. Your SSH client checks if the host you are trying to connect to has a host key in the ~/.ssh/known_hosts file
3. If the entry does not exist, add the host key to the ~/.ssh/known_hosts file
4. If the entry exists, use the host key (which is a public key) to encrypt a message, and expect the server to decrypt it. If the server has successfully decrypted the message, then it means that the server holds the private key which matches the given host key, meaning that it is who it claims to be .

More details, [please refer](https://hackernoon.com/ssh-keys-a-primer-7ac8b790e849
).
### PubkeyAuthentication

Need do something in server.

1. Client generate SSH keypair
2. Add client public to server `~/.ssh/authorized_keys`
3. Use client private key. `ssh -i`.

### SSH client config for multiple Pubkey

使用 PubkeyAuthentication, server 需要 client 的 public key。然后对于 client multiple，client 有很多 public key， ssh client 在建立连接时候该如何选择呢？ 答案是 SSH 进行连接的时候，不需要指定 public key，private key 里面包含 public key。

```plain
# Company account
Host company
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_company
# over http proxy
ProxyCommand C:\Program Files (x86)\Nmap\ncat.exe --proxy-type http --proxy 127.0.0.1:10801 %h %p

# Personal account
Host personal
HostName github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_personal
```

## Proxying with Dynamic Port Forwarding

![SSH1](./data/SSH1.png)

- Why need this?
- Sample

## Tunneling with Local Port Forwarding

![SSH2](./data/SSH2.png)

- Why need this?
- Sample

## Tunneling with Reverse Port Forwarding

![SSH3](./data/SSH3.png)

- Why need this?

## SSH Based Multi-hop Jump Hosts

![SSH4](./data/SSH4.png)

- Why need this?

## SSH Based VPN

![SSH5](./data/SSH5.png)

- Why need this?

## 引用

[Firewall Evasion and Remote Access with OpenSSH by Anthony Nocentino](https://www.youtube.com/watch?v=7gzA240k7OE)

[OpenSSH Internals for PowerShell Pros by Anthony Nocentino](https://www.youtube.com/watch?v=CPE2-bWK9Vc)

Or if you can't access youtube,

https://www.bilibili.com/video/av52884427/