import React from 'react'
import { Toaster } from 'react-hot-toast';

function ToasterComponent() {
    return (
        <Toaster
            position='top-right'
            toastOptions={{
                style: {
                    fontFamily: "'Montserrat', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'",
                    // background: 'white',
                    border: '2px solid #333',
                    fontSize: '1.6rem',
                    fontWeight: '600',
                    // borderRadius: '3px',
                    boxShadow: 'inset 0px 0px 2px 0px #000',

                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
                success: {
                    style: {

                    },
                    iconTheme: {
                        primary: '#009E57',
                        secondary: 'white',
                    },
                },
                error: {
                    style: {
                        // background: 'red',
                    },
                    iconTheme: {
                        primary: '#FF422A',
                        secondary: 'white',
                    },
                },
            }}

            containerStyle={{
                position: 'absolute',
            }}
        ></Toaster >
    )
}

export default React.memo(ToasterComponent);