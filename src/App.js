import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './css/app.css';
import './reset.css';
import loading from './img/loading.png'
import axios from 'axios';
import { Data } from './components/Data'
import { MenuItem } from './components/MenuItem';

class App extends Component {
    state = {
        selectedFrom: '',
        selectedTo: '',
        selectedLine: '',
        lines: {
            'Bakerloo': 'bakerloo',
            'Circle': 'circle',
            'Hammersmith & City': 'hammersmith-city',
            'Metropolitan': 'metropolitan',
            'Piccadilly': 'piccadilly',
            'Waterloo & City': 'waterloo-city',
            'Tfl Rail': 'tfl-rail',
            'Tram': 'tram',
            'Central': 'central',
            'District': 'district',
            'Jubilee': 'jubilee',
            'Northern': 'northern',
            'Victoria': 'victoria',
            'London Overground': 'london-overground',
            'DLR': 'dlr'
        },
        stations: {},
        updating: false,
        schedule: [],
        message: '',
    };
    changeLine = (selected) => {
        this.setState({
            selectedLine: this.state.lines[selected],
            selectedFrom: '',
            selectedTo: '',
            schedule: []
            },
            this.getStations
        );
    };
    getStations = () => {
        axios.get(`https://api.tfl.gov.uk/Line/${this.state.selectedLine}/StopPoints?app_id=91025f7d&app_key=55dcee2c7b158114ffd7431e536bd229`)
            .then(response => {
                let tempHash = {};
                for (let i = 0, length = response.data.length; i < length; i++) {
                    tempHash[response.data[i].commonName] = response.data[i].naptanId;
                }
                this.setState({
                    stations: tempHash
                });
            })
    };
    changeFrom = (selected) => {
        this.setState({selectedFrom: selected});
    };
    changeTo = (selected) => {
        this.setState({selectedTo: selected});
    };
    findSchedule = () => {
        if (this.state.selectedFrom === '' || this.state.selectedTo === '') {
            this.setState({message: 'Choose both points'});
            setTimeout(() => {
                this.setState({message: ''})
            }, 5000);
        } else {
            this.setState({updating: true});
            axios.get(`https://api.tfl.gov.uk/Line/${this.state.selectedLine}/Arrivals/${this.state.stations[this.state.selectedFrom]}?app_id=91025f7d&app_key=55dcee2c7b158114ffd7431e536bd229`)
                .then(response => {
                    this.setState({schedule: response.data, updating: false});
                })
        }
    };
    getReadyState = () =>{
        return this.state.selectedLine === '' ?
            ''
            :
            this.state.selectedFrom === '' ?
                'ready1'
                :
                this.state.selectedTo === '' ?
                    'ready2'
                    :
                    'ready3'
    };
    render() {
        return (
            <div className="app">
                <div className='app__menu'>
                    <div className='app__menu__light'>
                        <img className='app__menu__light__image' src={loading} alt='loading'/>
                        <div className={`app__menu__light__background ${this.getReadyState()}`} />
                    </div>
                    <MenuItem
                        tail_or_head='tail'
                        isSelected={this.state.selectedLine === ''}
                        title='Line:'
                        onChooseDropdown={this.changeLine}
                        listDropdown={Object.keys(this.state.lines)}
                        defaultDropdown={this.state.selectedLine}
                    />
                    <MenuItem
                        tail_or_head='tail'
                        isSelected={this.state.selectedFrom === ''}
                        title='From:'
                        onChooseDropdown={this.changeFrom}
                        listDropdown={Object.keys(this.state.stations)}
                        defaultDropdown={this.state.selectedFrom}
                    />
                    <MenuItem
                        tail_or_head='head'
                        isSelected={this.state.selectedTo === ''}
                        title='To:'
                        onChooseDropdown={this.changeTo}
                        listDropdown={Object.keys(this.state.stations)}
                        defaultDropdown={this.state.selectedTo}
                    />
                    <div className='app__menu__button'>
                        <CSSTransitionGroup  transitionName="button" transitionEnterTimeout={2000} transitionLeaveTimeout={2000}>
                            {
                                this.state.selectedLine && this.state.selectedFrom && this.state.selectedTo && <button onClick={this.findSchedule}>Get data</button>
                            }
                        </CSSTransitionGroup>
                    </div>
                </div>
                {this.state.message && <div className='app__error'>{this.state.message}</div>}
                <div className='app__body'>
                    <Data schedule={this.state.schedule}/>
                </div>
            </div>
        );
    }
}

export default App;
