const db = {
  people: [
    {
      id: 523,
      photo: 'https://kulturologia.ru/files/u18214/portrait68.jpg',
      name: 'Пупкина Ирина',
      // post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lorem consequat lectus auctor, a aliquam libero imperdiet. Aenean sapien orci, dapibus eu consectetur et, condimentum sed orci. Fusce euismod',
    },
    {
      id: 9577,
      photo: 'https://i.pinimg.com/236x/1e/30/e2/1e30e2ca9113e8558c25ad3238d32e0d.jpg',
      name: 'Кузнецов Влад',
      // post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt tincidunt vestibulum. Donec pharetra nec metus et iaculis. Ut eleifend',
    },
    {
      id: 7542,
      photo: 'https://i0.wp.com/spp-photo.ru/wp-content/uploads/2019/05/Devushka-v-vodolazke.png?w=700',
      name: 'Бардина Альбина',
      // post: 'В 2018 году Молодежный велосипедный саммит прошел в Париже, Франция. В рамках саммита участников призвали вдохновлять свои сообщества на участие в велоспорте и способствовать распространению информации о велоспорте.',
    },

  ],
  post: [
    {
      personId: 523,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lorem consequat lectus auctor, a aliquam libero imperdiet. Aenean sapien orci, dapibus eu consectetur et, condimentum sed orci. Fusce euismod',

    },
    {
      id: 9577,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lorem consequat lectus auctor, a aliquam libero imperdiet. Aenean sapien orci, dapibus eu consectetur et, condimentum sed orci. Fusce euismod',

    },
    {
      id: 7542,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lorem consequat lectus auctor, a aliquam libero imperdiet. Aenean sapien orci, dapibus eu consectetur et, condimentum sed orci. Fusce euismod',

    },

  ],

  users: [

  ],
}

module.exports = {
  db,
}
