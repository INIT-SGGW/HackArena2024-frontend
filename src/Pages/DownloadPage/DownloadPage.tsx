import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccountService from '../../Services/AccountService'

interface Props { }

function DownloadPage(props: Props) {
    const { teamName } = useParams<{ teamName: string }>()
    console.log(teamName)
    const navigator = useNavigate()

    useEffect(() => {
        AccountService.downloadSolution(teamName || "").then((response) => {
            if (response.status >= 200 && response.status < 300) {
                response.blob().then((blob) => {
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${teamName}.zip`
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