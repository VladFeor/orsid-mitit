import { useState } from 'react';


function ItemWork({ item }) {
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    const workSummery = item['work-summary'][0]
    const itemTitle = () => <div className="item__title"><span>{workSummery.title.title.value}</span></div>
    const itemSecondTitle = () => <div className="item__li">{item && workSummery["journal-title"] && workSummery["journal-title"]["value"]}</div>
    const itemDate = () => <div className="item__li">
        {item && workSummery["publication-date"] ? (
            <>
                {workSummery["publication-date"]["year"]["value"]}
                {workSummery["publication-date"]["month"] && ' - ' +workSummery["publication-date"]["month"]["value"]}
                {workSummery["publication-date"]["day"] && ' - ' +workSummery["publication-date"]["day"]["value"]} | Journal article
            </>
        ) : null}
    </div>
    const itemExternalType = () => {
        if (!item || item["external-ids"]["external-id"].length === 0) {
            return
        }
        return <div className="item__li">
            {(item && item["external-ids"]["external-id"].length != 0) && (item["external-ids"]["external-id"][0]["external-id-type"]).toUpperCase()}: {' '}
            {(item && item["external-ids"]["external-id"].length != 0)
                &&
                (item["external-ids"]["external-id"][0]["external-id-type"] === 'doi'
                    ?
                    <a
                        href={'https://doi.org/' + item["external-ids"]["external-id"][0]["external-id-value"]}
                        target='_blink'>{item["external-ids"]["external-id"][0]["external-id-normalized"]["value"]}
                    </a>
                    :
                    <span> {item["external-ids"]["external-id"][0]["external-id-normalized"]["value"]}</span>)
            }
        </div>
    }
    const itemPartOfISSN = () => {
        if (!(item && item["external-ids"]["external-id"].length != 0)) return
        const allPart = workSummery["external-ids"]["external-id"];
        const issnItems = allPart.filter(item => item['external-id-type'] === "issn");
        if (issnItems.length != 0) {
            return issnItems.map((item,index) => <div className="item__li"
                key={index}
            >Part of ISSN: <a
                href={item["external-id-url"] && item["external-id-url"]["value"]}
                target='_blink'>
                {item["external-id-value"]}
            </a>
            </div>)
        }
    }
    const itemURL = () => {
        if (workSummery['url']) {
            return <div className="element__details">
                <div className="element__name">URL</div>
                <a href={workSummery['url']['value']} target="_blank" className="element__text">{workSummery['url']['value']}</a>
            </div>
        }

    }
    const itemAdded = () => {
        const milliseconds = workSummery['created-date']["value"];
        const startDate = new Date(0);
        const resultDate = new Date(startDate.getTime() + milliseconds);
        const year = resultDate.getFullYear();
        const month = (resultDate.getMonth() + 1).toString().padStart(2, '0');
        const day = resultDate.getDate().toString().padStart(2, '0');

        if (workSummery['publication-date']) {
            return <div className="element__details">
                <div className="element__name">Added</div>
                <div className="element__text">{`${year}-${month}-${day}`}</div>
            </div>
        }

    }
    const itemLastModified = () => {
        const milliseconds = workSummery['last-modified-date']["value"];
        const startDate = new Date(0);
        const resultDate = new Date(startDate.getTime() + milliseconds);
        const year = resultDate.getFullYear();
        const month = (resultDate.getMonth() + 1).toString().padStart(2, '0');
        const day = resultDate.getDate().toString().padStart(2, '0');

        if (workSummery['publication-date']) {
            return <div className="element__details">
                <div className="element__name">Added</div>
                <div className="element__text">{`${year}-${month}-${day}`}</div>
            </div>
        }
    }
    const itemSource = () => <div className="item__source">Джерело
        : {' '}
        {(workSummery["source"]["assertion-origin-name"])
            ?
            workSummery["source"]["assertion-origin-name"]["value"] + ' ' + workSummery["source"]["source-name"]['value']
            :
            workSummery["source"]["source-name"]['value']
        }</div>

    return (
        <div className="App">
            <div className="item__work">
                {itemTitle()}
                <div className="item__text">
                    {itemSecondTitle()}
                    {itemDate()}
                    {itemExternalType()}
                    {itemPartOfISSN()}
                    <div className={`details ${isOpenDetails ? 'open' : ''}`} >
                        {itemURL()}
                        {itemAdded()}
                        {itemLastModified()}
                    </div>
                    <div className="item__btn" onClick={() => setIsOpenDetails(!isOpenDetails)}>
                        {isOpenDetails ? 'Згорнути' : 'Більше інформації'}
                    </div>
                </div>
                {/* {itemSource()} */}
            </div>
        </div>
    );
}

export default ItemWork;
