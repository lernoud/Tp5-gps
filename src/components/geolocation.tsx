import React, {useEffect, useState} from 'react';
import { Geoposition } from '@ionic-native/geolocation';
import { IonButton, IonLoading, useIonViewWillEnter, IonTitle } from '@ionic/react';
import { useCurrentPosition, useWatchPosition, availableFeatures } from '@ionic/react-hooks/geolocation';
import { Plugins } from '@capacitor/core';

const { Geolocation, Storage } = Plugins;

const Geolocalisation: React.FC = () => {
    const { currentPosition, getPosition } = useCurrentPosition();
    const [resLat, setResLat] = useState<string>()
    const [resLong, setResLong] = useState<string>()

    useEffect(() => {
        handleRefreshPosition()
        let resLat = currentPosition?.coords.latitude.toFixed(10)
        let resLong = currentPosition?.coords.longitude.toFixed(10)
        setResLat(resLat)
        setResLong(resLong)
    })

    const handleRefreshPosition = () => {
        getPosition()
        console.log('Latitude : ' + currentPosition?.coords.latitude)
        console.log('Longitude : ' + currentPosition?.coords.longitude)
    }

    interface IPosition {
        latitude ?: string,
        longitude ?: string
    }
    
    const savePosition = () => {
        const position : IPosition = {
            latitude : resLat,
            longitude : resLong
        }
        Storage.set({
            key : 'position',
            value : JSON.stringify(position)
        })   
        console.log(position)
    }

return(
    <>
    <IonTitle>Your current position is :</IonTitle>
    <p />
    <IonTitle>Latitude : {resLat}</IonTitle>
    <IonTitle>Longitude : {resLong}</IonTitle>
    <IonButton onClick={(savePosition)}>
        <img src="assets/icon/icons8-save.png" />
    </IonButton>
    </>
)

}

export default Geolocalisation