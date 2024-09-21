export const logo = 'https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';

export const user_avatar = "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg";


export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: process.env.REACT_APP_TMDB_NEW_KEY,
  }
};


export const IMG_URL = "https://image.tmdb.org/t/p/w500/";
export const BG_URL = 'https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg';

export const SUPPORTED_LANGUAGES = [{identifier: "en", name: "English"},
{identifier: "hindi", name: "Hindi"},
{identifier: "spanish", name: "Spanish"},
]
