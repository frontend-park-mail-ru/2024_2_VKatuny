# 2024_2_VKatuny

Данный репозиторий предназначен для хранения frontend части проекта HeadHunter,
разрабатываемого командой VKатуны.

- [2024\_2\_VKatuny](#2024_2_vkatuny)
  - [Участники проекта](#участники-проекта)
    - [Члены команды](#члены-команды)
    - [Менторы](#менторы)
  - [Ссылки на внешние ресурсы](#ссылки-на-внешние-ресурсы)
  - [О продукте](#о-продукте)
  - [Установка и запуск](#установка-и-запуск)
    - [Зависимости](#зависимости)
    - [Запуск](#запуск)

## Участники проекта

### Члены команды

- [Илья Андриянов](https://github.com/Regikon)
- [~~Виктория Гурьева~~](https://github.com/VikaGuryeva) (Покинула проект)
- [Олег Музалев](https://github.com/Olgmuzalev13)
- [Михаил Черепнин](https://github.com/Ifelsik)

### Менторы

- **UI/UX**: Екатерина Гражданкина
- **Frontend**: Алексей Зотов
- **Backend**: Никита Архаров

## Ссылки на внешние ресурсы

- [Стандартная ссылка на деплой](http://89.208.199.175)
- [Репозиторий бэкенда](https://github.com/go-park-mail-ru/2024_2_VKatuny)
- [Ссылка на документацию api в репозитории бэкенда](https://github.com/go-park-mail-ru/2024_2_VKatuny/tree/feature_vacancies-list-api/api)

## О продукте

Данный раздел будет заполнен по готовности четких представлений о продукте

## Установка и запуск

### Зависимости

Для запуска необходимо установить зависимости:

- Node v20.16.0  
  После установки Node нужно доставить дополнительные зависимости стандартной
  командой

  ```bash
  npm install
  ```

### Запуск

Рабочий процесс настроен на webpack dev server. Чтобы его запустить, нужно прописать

```bash
npm run start
```

Сборка для продакшена осуществляется при помощи команды

```bash
npm run build
```

Запуск дев-сервера (устарел, но пока нужен для прода) осуществляется при помощи команды

```bash
npm run dev-server
```

При этом модифицировать ip-адрес и порт, на котором будет слушать сервер,
можно внутри файла ./src/server/server.mjs