import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccountService from '../../Services/AccountService'

interface Props { }

function DownloadPage(props: Props) {
    const teamID = useParams<{ teamID: string }>().teamID
    const navigator = useNavigate()

    useEffect(() => {
        AccountService.downloadSolution(teamID || "").then((response) => {
            if (response.status >= 200 && response.status < 300) {
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${teamID}.zip`
                    a.click()
                }).then(() => {
                    navigator("/");
                })
            } else {
                response.json().then((data) => {
                    if (data.error) {
                        throw new Error(data.error)
                    } else {
                        throw new Error("Wystąpił błąd podczas pobierania pliku")
                    }
                }).catch((error) => {
                    console.error(error)
                    navigator("/")
                })
            }
        }).catch((error) => {
            console.error(error)
            navigator("/")
        })
    }, [])

    return <></>
}

export default DownloadPage