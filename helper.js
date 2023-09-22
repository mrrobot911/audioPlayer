export const createElement = (tagName,attr) => {
    const elem = document.createElement(tagName);
    Object.assign(elem, attr);
    return elem
};

export const music_list = [
    {
        img : 'images/Icon_For_Hire.jpg',
        name : 'Up In Flames',
        artist : 'Icon For Hire',
        music : 'music/Icon_For_Hire.mp3'
    },
    {
        img : 'images/muse.jpeg',
        name : 'Uprising',
        artist : 'Muse',
        music : 'music/Muse_Uprising.mp3'
    },
    {
        img : 'images/brmc.jpg',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Beat_The_Devils_Tattoo.mp3'
    }
];

