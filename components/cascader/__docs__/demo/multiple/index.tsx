import React from 'react';
import ReactDOM from 'react-dom';
import { Cascader } from '@alifd/next';
import type { CascaderDataItem, CascaderProps } from '@alifd/next/types/cascader';
import 'whatwg-fetch';

class Demo extends React.Component {
    state = {
        label: '',
        data: [],
    };

    componentDidMount() {
        fetch('https://os.alipayobjects.com/rmsportal/ODDwqcDFTLAguOvWEolX.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            })
            .catch(e => console.log(e));
    }

    handleChange: CascaderProps['onChange'] = (value, data, extra) => {
        console.log(value, data, extra);

        this.setState({
            label: (data as CascaderDataItem[]).map(d => d.label).join(', '),
        });
    };

    render() {
        return (
            <div>
                <div className="cascader-value">Select: {this.state.label}</div>
                <Cascader multiple dataSource={this.state.data} onChange={this.handleChange} />
            </div>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
