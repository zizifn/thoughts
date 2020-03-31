$cn2GIA_49 = Invoke-WebRequest -Uri "https://bwh88.net/cart.php?a=add&pid=94"

if ($cn2GIA_49.StatusCode -eq 200) {
    if ($cn2GIA_49.Content -match "Out of Stock") {
        Write-Host "out of stock";
        Invoke-WebRequest -Uri 'http://sc.ftqq.com/**********************.send?text=搬瓦工CN2-GIA-有货&desp=$49.9有货'
    }
    else {
        Write-Host "send to wechat"
        // send to wechat
        Invoke-WebRequest -Uri 'http://sc.ftqq.com/**********************.send?text=搬瓦工CN2-GIA-有货&desp=$49.9有货'
    }
}

$cn2GIA_39 = Invoke-WebRequest -Uri "https://bwh88.net/cart.php?a=add&pid=71"

if ($cn2GIA_39.StatusCode -eq 200) {
    if ($cn2GIA_39.Content -match "Out of Stock") {
        Write-Host "out of stock"
    }
    else {
        Write-Host "send to wechat"
        // send to wechat
        Invoke-WebRequest -Uri 'http://sc.ftqq.com/**********************.send?text=搬瓦工CN2-GIA-有货&desp=$39.9有货'
    }
}