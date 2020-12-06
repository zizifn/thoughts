# GUIDE

## SetUP

Windows 10 1903 version. explorer folder path `\\wsl$\Ubuntu`

### [Online Guide](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly)

### WSL Command

```wsl -help
wsl -help
命令行选项无效: -help
使用: wsl.exe [选项] ......
选项:
    -d, --distribution <DistributionName>
        启动指定的分发。

    -e, --exec <CommandLine>
        执行指定的 Linux 命令。其余的参数
        用作命令行执行。

    -u, --user <UserName>
        作为指定用户运行。

    --帮助
        显示使用信息。

    --
        停止解析参数，并将其余部分传递给 Linux 进程。
```

### WSL proxy

```
// in .bashrc
// 得到host的IP
export WSL_HOST_IP=$(awk '/nameserver/ { print $2 }' /etc/resolv.conf)
export http_proxy=http://$WSL_HOST_IP:1081
export https_proxy=http://$WSL_HOST_IP:1081
export no_proxy=$WSL_HOST_IP,localhost,127.0.0.1,0.0.0.0,*.aliyun.com
```

## Troubleshooting

### 如何让 WSL2 程序访问本地程序， 比如 proxy？

由于 WSL2 使用的是 vEthernet (WSL) 网络适配器。默认情况是走的 public 网络，所以防火墙会 block WSL2 到 host 的网络请求。 所以需要修改 firewall

```powershell
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound  -InterfaceAlias "vEthernet (WSL)"  -Action Allow
```

如果需要更精确的控制，需要自己在 windows 防火墙添加 rule(注意是选择公用)。
