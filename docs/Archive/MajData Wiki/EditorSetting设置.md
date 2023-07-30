在文件夹下有一个叫`EditorSetting.json`的文件（根据您电脑的设置，您有可能看不到`.json`的后缀）。您可以使用**记事本**或者其他文本编辑软件打开。

打开后，您可以看到一行一行的设置。**大部分设置都可以在编辑器中直接修改**，不需要您专门打开文件来修改。但是**有一些设置，必须要手动编辑**。

### 自动更新设置

在每次您打开Majdata的时候，都会自动检查您的Majdata是否为最新版本。

如果您使用的是**最新版**，或者您的**网络不可用**，则**不会发出任何提示**。

不过，如果您想使用某一个旧版本，并且不想被自动更新检查打扰，您可以您可以打开**编辑器设置**，然后禁用这个功能。

### 撞尾检测默认精度

在Majdata的菜单栏中点击`工具->无理检测`，可以打开无理检测工具，帮助您检查您的谱面是否存在错误的内容。

在这个功能中，默认的撞尾检测精度是`0.2`（具体含义可将鼠标放在**这是什么**上查看）。

您可以打开Majdata目录下的`EditorSetting.json`文件，找到以下行：

```json
...
  "DefaultSlideAccuracy": 0.2,
...
```

将上文中的`0.2`修改为其他数值，如`0.15`（更宽松的检测）、`0.25`（更严格的检测）。

当然，打开无理检测工具后，**您其实也可以手动修改这个数值，只不过在下次打开时又会恢复到默认值**。

### 快捷键设定

上文提及的快捷键均可设置成自己喜欢的。

```json
...
  "PlayPauseKey": "Ctrl+Shift+c",
  "PlayStopKey": "Ctrl+Shift+x",
  "SendViewerKey": "Ctrl+Shift+z",
  "SaveKey": "Ctrl+s",
  "IncreasePlaybackSpeedKey": "Ctrl+p",
  "DecreasePlaybackSpeedKey": "Ctrl+o",
...
```

您可以修改上文中**后面引号里的内容**。

举例来说，您想把**录制模式**的快捷键改为Ctrl+U，您就需要将

```json
  "SendViewerKey": "Ctrl+Shift+z",
```

改为

```json
  "SendViewerKey": "Ctrl+u",
```

**请注意不要将引号以及结尾的逗号删除！**

除了所有的字母按键以外，一些键位的名称可能并非直觉上的那样（如分号键是`OemSemicolon`而不是`;`），您可以参考[这篇文档](https://docs.microsoft.com/zh-cn/dotnet/api/system.windows.input.key)。

### 字体大小

```json
...
  "FontSize": 12.0,
...
```

您可以修改编辑器中所有字体的大小，将上文中的`12.0`修改为任何想要的数字即可。

Authors :
- LingFeng-bbben
