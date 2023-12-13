const { Link, useSearchParams } = ReactRouterDOM

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { DataTable } from '../cmps/data-table/DataTable.jsx'
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(
        mailService.getFilterFromQueryString(searchParams)
    )

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
        return () => {
            console.log('Bye Bye')
        }
    }, [filterBy])

    function loadMails() {
        mailService
            .query(filterBy)
            .then((mails) => setMails(mails))
            .catch((err) => console.log('err:', err))
    }

    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails((prevMails) => {
                    return prevMails.filter((mail) => mail.id !== mailId)
                })
                showSuccessMsg(`Mail successfully removed! ${mailId}`)
            })
            .catch((err) => console.log('err:', err))
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index main-layout full">
            <MailFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />
            {/* <MailList mails={mails} onRemoveMail={onRemoveMail} /> */}
            <DataTable mails={mails} />
        </section>
    )
}
