import React, { useEffect, useState } from 'react';
import { Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonLoading, useIonViewWillEnter, IonTitle } from '@ionic/react';
import { useCurrentPosition, useWatchPosition, availableFeatures } from '@ionic/react-hooks/geolocation';
import { Plugins } from '@capacitor/core';

const { Geolocation, Storage } = Plugins;

const Geolocalisation: React.FC = () => {
    //Hooks useState
    const { currentPosition, getPosition } = useCurrentPosition();
    const [resLat, setResLat] = useState<string>()
    const [resLong, setResLong] = useState<string>()

    //Similaire à componentDidMount et componentDidUpdate
    useEffect(() => {
        handleRefreshPosition()
        // Arrondi à la puissance 10
        let resLat = currentPosition?.coords.latitude.toFixed(10)
        let resLong = currentPosition?.coords.longitude.toFixed(10)
        setResLat(resLat)
        setResLong(resLong)
    })

    //Récupère la position longitude, latitude
    const handleRefreshPosition = () => {
        getPosition()
        console.log('Latitude : ' + currentPosition?.coords.latitude)
        console.log('Longitude : ' + currentPosition?.coords.longitude)
    }

    interface IPosition {
        latitude?: string,
        longitude?: string
    }

    //Sauvgarde la longitude et la latitude actuelle
    const savePosition = () => {
        const position: IPosition = {
            latitude: resLat,
            longitude: resLong
        }
        //Envoie position
        Storage.set({
            key: 'position',
            value: JSON.stringify(position)
        })
        console.log(position)
    }
    //mettre un logo sur le bouton de sauvgarde 
    return (
        <>
            <IonTitle>Your current position is :</IonTitle>
            <IonTitle>Latitude : {resLat}</IonTitle>
            <IonTitle>Longitude : {resLong}</IonTitle>
            <IonButton onClick={(savePosition)}>
                save
    </IonButton>
        </>
    )

}

export default Geolocalisation