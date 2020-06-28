# ReactNativeKakeibo

## 開発環境
Mac (catalina ver 10.15.1)
ReactNative 
Expo (Ver 3.11.3)
Xcode(主にios用のアプリ開発）

## 概要
機能を最小限に抑えた使いやすい家計簿アプリの開発を行った。主な機能は２つである。

①計算機付きの入力ページ
　値段・カテゴリ・購入した商品・日付を入力し、送信すると保存できるシンプルな構成
 
②レシートを撮影し文字を認識　→　保存するページ
　Google Cloud Vision Apiを用いて画像認識を可能にした。この機能によって使いやすさが向上している。
 
## 立ち上げコマンド

プロジェクト立ち上げのために以下の２つをインストールします。

```
$ brew install node
$ brew install watchman
```

以下のコマンドでexpoのダウンロードを行います。
```
$ npm install expo-cli --g
```


次に、json-serverの立ち上げを以下コマンドで行います。
(このコマンドはpackage.jsonのscripts部分に追記しています）
```
$ npm run json-server 
```


以下のコマンドでexpoを立ち上げます。

```
$ expo start 
```

読み込みが完了し、デベロッパーツールが立ち上がった後にターミナルで「i」を押すとiosのシュミレーターが立ち上がります。

