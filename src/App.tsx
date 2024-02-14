import React, {useEffect, useState} from 'react'
import './App.css'
import Form from 'react-bootstrap/Form'
import {Container} from 'react-bootstrap'
import usePrefersColorScheme from 'use-prefers-color-scheme'
import {useLocalStorage} from '@uidotdev/usehooks'

const convertToInsertStatement = (jsonString: string, collectionName: string) => {
    let json = jsonString
        .replaceAll(/\{"\$oid": "(.+)"}/g, 'ObjectId("$1")')
        .replaceAll(/("[0-9a-f]{24}")/g, 'ObjectId($1)')
        .replaceAll(/\{\"\$date\"\: \"(.+)"\}/g, 'Date("$1")')
        .replaceAll(/("\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d.\d{3}Z")/g, 'Date($1)')

    return `db.getCollection('${collectionName}').insertMany(${json})`
}

function App() {
    const theme = usePrefersColorScheme()
    document.documentElement.setAttribute('data-bs-theme', theme)

    const [collectionName, setCollectionName] = useLocalStorage('collectionName', '')
    const [json, setJson] = useLocalStorage('json', '[]')
    const [mongoCode, setMongoCode] = useState('')

    useEffect(() => {
        setMongoCode(convertToInsertStatement(json, collectionName))
    }, [json, collectionName])

    return (
        <Container
            className="App"
            data-bs-theme={theme}
            style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                padding: 10,
            }}
        >
            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Form.Label style={{margin: 10}}>
                    Collection name
                </Form.Label>
                <input
                    type="text"
                    value={collectionName}
                    className={'form-control'}
                    style={{margin: 10}}
                    onChange={e => {
                        setCollectionName(e.target.value)
                    }}
                />

                <Form.Label style={{margin: 10}}>
                    JSON data from a Mongo DB collection
                </Form.Label>
                <textarea
                    value={json}
                    style={{flex: 1, margin: 10}}
                    className={'form-control'}
                    onChange={e => {
                        setJson(e.target.value)
                    }}
                />
            </div>

            <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                <Form.Label style={{margin: 10}}>
                    Mongo DB insert statements
                </Form.Label>
                <textarea
                    value={mongoCode}
                    style={{flex: 1, margin: 10}}
                    className={'form-control'}
                    readOnly={true}
                />
            </div>
        </Container>
    )
}

export default App
