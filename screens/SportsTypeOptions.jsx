import React from 'react'

const Cricket = () => {
    return (
        <SportsSchedule activeSport="Cricket" />
    )
}

const Futsal = () => {
    return (
        <SportsSchedule activeSport="Futsal" />
    )
}

const BasketBall = () => {
    return (
        <SportsSchedule activeSport="BasketBall" />
    )
}


const Badminton = () => {
    return (
        <SportsSchedule activeSport="Badminton" />
    )
}


const SportsTypeOptions = () => {
    return (
        <div>
            <Cricket />
            <Futsal />
            <BasketBall />
            <Badminton />
        </div>
    )
}
export default SportsTypeOptions