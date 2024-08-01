import './styles.scss'
export type ReviewListCountProps = {
    count: number
}

export default function ReviewListCount(props: ReviewListCountProps) {
    return (
        <p className='reviews-list-count'>
            {`${props.count} ${props.count == 1 ? "review" : "reviews"}`}
        </p>
    )
}
