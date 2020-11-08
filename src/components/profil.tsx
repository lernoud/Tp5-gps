import { IonTitle } from '@ionic/react';
import { profile } from 'console';
import React, { useEffect, useState } from 'react';
import { Plugins } from '@capacitor/core';
import { errorMonitor } from 'events';
const { Geolocation, Storage } = Plugins;
const Profil: React.FC = () => {
    //Hooks useState
    const [name, setName] = useState('Jordan')
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    //Similaire à componentDidMount et componentDidUpdate
    useEffect(() => {
        getPosition()
            .then((res) => { console.log(res) })
            .catch((error) => { console.log(error) })
    })
    //Récuperation données position
    async function getPosition() {
        const ret = await Storage.get({ key: 'position' });
        const value: string = (ret.value != null) ? ret.value : '';
        const position = JSON.parse(value)
        console.log(position)
        setLatitude(position.latitude)
        setLongitude(position.longitude)
        return position
    }



    return (
        <>
            <IonTitle>Username : {name}</IonTitle>
            <IonTitle>Last latitude : {latitude}</IonTitle>
            <IonTitle>Last longitude : {longitude}</IonTitle>
        </>
    )
}

export default Profil