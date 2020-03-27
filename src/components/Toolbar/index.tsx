import * as React from 'react'

interface Props {
    onStep: () => void
}

const Toolbar = (props: Props) => {
    return (
        <div>
            <button onClick={props.onStep}>Next generation</button>
        </div>
    )
};

export default Toolbar
