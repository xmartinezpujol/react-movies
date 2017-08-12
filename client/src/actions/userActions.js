// SAMPLE DATA
const sampleUser = {
  name: 'Xavier',
  img: 'https://secure.gravatar.com/avatar/170393619042fee71496c35beddc5952.jpg',
  fav_genres: ['Adventure', 'Animation', 'Comedy', 'Fantasy', 'Science Fiction']
}

// Sync Action
export const getUser = () => ({
    type: 'GET_USER_SUCCESS',
    sampleUser
});
