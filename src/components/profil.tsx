import { IonTitle, IonAlert } from '@ionic/react';
import { profile } from 'console';
import React, {useEffect, useState} from 'react';
import { Plugins } from '@capacitor/core';
import { errorMonitor } from 'events';
import { getName } from 'ionicons/dist/types/components/icon/utils';
const { Geolocation, Storage } = Plugins;
const Profil: React.FC = () => {

    //Hooks useState
    const [name, setName] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [showEditUsernameAlert, setShowEditUsernameAlert] = useState(false);

    //Similaire à componentDidMount et componentDidUpdate
    useEffect(() => {
        getPosition()
            .then((res) => {console.log(res)})
            .catch((error) => {console.log(error)})
        getName()
            .then((res) => {console.log(res)})
            .catch((error) => {console.log(error)})
    })

    //Récuperation données position
    async function getPosition() {
        const ret  = await Storage.get({ key: 'position' });
        const value : string = (ret.value != null) ? ret.value : '';
        const position = JSON.parse(value)
        console.log(position)
        setLatitude(position.latitude)
        setLongitude(position.longitude)
        return position
    }

    interface Iprofil {
        nameUpdate ?: string,
    }

    // Mise a jour du profil
    const saveName = (name: string) => {
        Storage.set({
            key : 'profil',
            value : name
        })
        console.log(name)
    }

    //Récuperation données profil
    async function getName() {
        const ret  = await Storage.get({ key: 'profil' });
        const value : string = (ret.value != null) ? ret.value : '';
        const name : any = value
        console.log(name)
        setName(name)
        return name
    }

    return(
        <>
            <IonTitle onClick={() => setShowEditUsernameAlert(true)}>Username : {name}</IonTitle>
            <IonTitle>Last latitude : {latitude}</IonTitle>
            <IonTitle>Last longitude : {longitude}</IonTitle>

            <IonAlert
                isOpen={showEditUsernameAlert}
                onDidDismiss={() => setShowEditUsernameAlert(false)}
                header={'Change Username?'}
                inputs={[
                    {
                        name: 'usernameInput',
                        type: 'text',
                        id: 'profile-username',
                        value: name,
                        placeholder: 'Your username'
                    }]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: 'Ok',
                        handler: (alertData) => saveName(alertData.usernameInput)
                    }
                ]}

            />

        </>
    )
}

export default Profil