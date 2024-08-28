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
import { Switch } from "@headlessui/react";
// import { useAuth } from './components/AuthContext';

// ///////////////////////////////////////////////////////////////////
// all arrays are taken from the database and desc by view number
// carousel post image

export const headerPostItem = [
    { id: 0, imageSrc: require('./images/33138010_8010266.png') },
    { id: 1, imageSrc: require('./images/33418152_8044927.png') },
    { id: 2, imageSrc: require('./images/33921407_8095756.png') },
    { id: 3, imageSrc: require('./images/34684748_8156480.png') },
]



// ****************************************************
// remove
// best albums of all time infomation array
export const bestAlbum = [
    { id: 0, imageSrc: require('./images/10604875_4512064.jpg') },
    { id: 1, imageSrc: require('./images/4464775_2372686.jpg') },
    { id: 2, imageSrc: require('./images/5237910_2688833.jpg') },
    { id: 3, imageSrc: require('./images/9802046_4219738.jpg') },
    { id: 4, imageSrc: require('./images/10604875_4512064.jpg') },
    { id: 5, imageSrc: require('./images/4464775_2372686.jpg') },
    { id: 6, imageSrc: require('./images/5237910_2688833.jpg') },
    { id: 7, imageSrc: require('./images/9802046_4219738.jpg') },
    { id: 8, imageSrc: require('./images/10604875_4512064.jpg') },
    { id: 9, imageSrc: require('./images/4464775_2372686.jpg') },
    { id: 10, imageSrc: require('./images/5237910_2688833.jpg') },
    { id: 11, imageSrc: require('./images/9802046_4219738.jpg') },
    { id: 12, imageSrc: require('./images/10604875_4512064.jpg') },
]
// remove
// ****************************************************

// ****************************************************

// recent favourite infomation array
export const recentFavList = [
    { id: 0, imageSrc: require('./images/5237910_2688833.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet ing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 1, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consec elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 2, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 3, imageSrc: require('./images/10604875_4512064.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 4, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 5, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 6, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
];
// ****************************************************

// ****************************************************
// after add users in db
// notification array
export const notificationList = [
    { id: 0, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 1, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 2, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 3, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 4, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 5, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
    { id: 6, imageSrc: require('./images/10604875_4512064.jpg'), title: 'test', subTitle: 'test teadfmk dfm dfbdbstrhj' },
]

export const favouriteList = [];
export const playList = [
    { id: 0, imageSrc: require('./images/5237910_2688833.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 1, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 2, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 3, imageSrc: require('./images/10604875_4512064.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 4, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 5, imageSrc: require('./images/9802046_4219738.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
    { id: 6, imageSrc: require('./images/4464775_2372686.jpg'), title: 'Lorem ipsum', subTitle: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam itaque ipsam laudantium dolor voluptatum dicta quis' },
];
// ****************************************************

/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */


export default function App() {

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/favorites/:userId" component={<Favourite />} />
                </Switch>
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