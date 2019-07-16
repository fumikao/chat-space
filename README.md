Chat-space
====
## 概要
多人数でチャットができるアプリケーションです。

## 機能
- 新規登録・ログイン・ログアウト
- グループ作成・編集
- メッセージ投稿
- 画像投稿

## 使用技術
- Ruby
- Ruby on Rails
- jQuery
- MySQL
- AWS

## DB設計

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|

#### Association

- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users

### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association

- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users

### group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

#### Association

- belongs_to :user
- belongs_to :group

### messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

#### Association

- belongs_to :user
- belongs_to :group