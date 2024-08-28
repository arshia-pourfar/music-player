/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import AllMusic from "./pages/AllMusic";
import Favourite from "./pages/Favourite";
import PlayList from "./pages/PlayList";
import Download from "./pages/Download";
import Setting from "./pages/Setting";
// import User from "./components/LogIn";
import { AuthProvider } from './hooks/AuthContext';
import myHomePostImage1 from './images/33138010_8010266.png';
import myHomePostImage2 from './images/33138010_8010266.png';
import myHomePostImage3 from './images/33138010_8010266.png';
import myHomePostImage4 from './images/33138010_8010266.png';

import myImage1 from './images/10604875_4512064.jpg';
import myImage2 from './images/4464775_2372686.jpg';
import myImage3 from './images/4464775_2372686.jpg';
import myImage4 from './images/9802046_4219738.jpg';


// import { } from "@headlessui/react";
// import { useAuth } from './components/AuthContext';

// ///////////////////////////////////////////////////////////////////
// all arrays are taken from the database and desc by view number
// carousel post image

export const headerPostItem = [
    { id: 0, imageSrc: myHomePostImage1 },
    { id: 1, imageSrc: myHomePostImage2 },
    { id: 2, imageSrc: myHomePostImage3 },
    { id: 3, imageSrc: myHomePostImage4 },
]



// ****************************************************
// remove
// best albums of all time infomation array
export const bestAlbum = [
    { id: 0, imageSrc: myImage1 },
    { id: 1, imageSrc: myImage2 },
    { id: 2, imageSrc: myImage3 },
    { id: 3, imageSrc: myImage4 },
    { id: 4, imageSrc: myImage1 },
    { id: 5, imageSrc: myImage2 },
    { id: 6, imageSrc: myImage3 },
    { id: 7, imageSrc: myImage4 },
    { id: 8, imageSrc: myImage1 },
    { id: 9, imageSrc: myImage2 },
    { id: 10, imageSrc: myImage3 },
    { id: 11, imageSrc: myImage4 },
    { id: 12, imageSrc: myImage3 },
]
// remove
// ****************************************************

// ****************************************************

// recent favourite infomation array
export const recentFavList = [
    { id: 0, imageSrc: myImage1, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet ing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 1, imageSrc: myImage2, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consec elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 2, imageSrc: myImage3, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 3, imageSrc: myImage4, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 4, imageSrc: myImage1, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 5, imageSrc: myImage2, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 6, imageSrc: myImage3, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
];
// ****************************************************

// ****************************************************
// after add users in db
// notification array
export const notificationList = [
    { id: 0, imageSrc: myImage1, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 1, imageSrc: myImage2, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 2, imageSrc: myImage3, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 3, imageSrc: myImage4, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 4, imageSrc: myImage1, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 5, imageSrc: myImage2, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 6, imageSrc: myImage3, title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
]

export const favouriteList = [];
export const playList = [
    { id: 0, imageSrc: myImage4, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 1, imageSrc: myImage1, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 2, imageSrc: myImage2, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 3, imageSrc: myImage3, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 4, imageSrc: myImage4, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 5, imageSrc: myImage1, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 6, imageSrc: myImage3, title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
];
// ****************************************************

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */


export default function App() {

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AllMusic" element={<AllMusic />} />
                    <Route path="/Favourite" element={<Favourite />} />
                    <Route path="/PlayList" element={<PlayList />} />
                    <Route path="/Download" element={<Download />} />
                    {/* <Route path="/User" element={<User />} /> */}
                    <Route path="/Setting" element={<Setting />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}