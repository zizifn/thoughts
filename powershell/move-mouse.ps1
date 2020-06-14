
Add-Type @"
using System;
using System.Runtime.InteropServices;
public class SFW {
  [DllImport("user32.dll")]
  [return: MarshalAs(UnmanagedType.Bool)]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class SFW1 {
  [DllImport("user32.dll")]
  [return: MarshalAs(UnmanagedType.Bool)]
  public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@


Clear-Host
Echo "Moving mouse..."
Add-Type -AssemblyName System.Windows.Forms

$PlusOrMinus = 1
while ($true) {
  $p = [System.Windows.Forms.Cursor]::Position
  $x = $p.X + $PlusOrMinus
  $y = $p.Y + $PlusOrMinus

  $cdViewer = (Get-Process CDViewer).MainWindowHandle;
  [SFW]::SetForegroundWindow($cdViewer);
  [SFW1]::ShowWindow($cdViewer, 1);

  [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
  Echo "Moving mouse...x = $x  y= $y"

  Start-Sleep -Seconds 1800
  $PlusOrMinus *= -1
}