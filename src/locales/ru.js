export default {
  translation: {
    networkError: 'Ошибка соединения',
    chatName: 'Hexlet чат',
    exit: 'Выйти',
    logIn: 'Войти',
    nickname: 'Имя пользователя',
    password: 'Пароль',
    login: {
      altImageText: 'Страница входа',
      dontHaveAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      wrongCredentials: 'Неверные имя пользователя или пароль',
    },
    signup: {
      altImageText: 'Страница регистрации',
      labelForm: 'Регистрация',
      maybeHaveAccount: 'Уже есть аккаунт?',
      registration: 'Регистрация',
      confirmPassword: 'Подтвердите пароль',
      submitForm: 'Зарегистрироваться',
    },
    validation: {
      alreadyHaveUser: 'Пользователь уже существует',
      required: 'Поле должно быть заполнено',
      minNameLength: 'От 3 до 20 символов',
      maxNameLength: 'От 3 до 20 символов',
      minPasswordLength: 'Не менее 6 символов',
      maxPasswordLength: 'Не более 200 символов',
      passwordMismatch: 'Пароли не совпадают',
    },
    channelValidation: {
      minLength: 'От 3 до 20 символов',
      maxLength: 'От 3 до 20 символов',
      required: 'Необходимо указать имя канала',
      alreadyExists: 'Канал с таким именем уже существует',
    },
    channelsList: {
      channels: 'Каналы',
      renameChannel: 'Переименовать',
      deleteChannel: 'Удалить',
    },
    messageForm: {
      placeholder: 'Введите сообщение...',
      sendMessage: 'Отправить',
    },
    messagesList: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} соощений',
    },
    modals: {
      cancel: 'Отменить',
      send: 'Отправить',
      inputChannelName: 'Введите название канала',
      AddChannel: {
        title: 'Добавить канал',
        added: 'Канал создан',
      },
      RenameChannel: {
        title: 'Переименовать канал',
        renamed: 'Канал переименован',
      },
      RemoveChannel: {
        question: 'Удалить канал {{channelName}}?',
        title: 'Удалить канал',
        remove: 'Удалить',
        removed: 'Канал удален',
      },
    },
  },
};
