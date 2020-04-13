import React, {ChangeEventHandler, MouseEventHandler, useState} from 'react';
import {Page} from '../Page';
import {fetchLogin} from '../../service/auth';
import {useSession} from '../../context/SessionContext';
import {useHistory} from 'react-router';

export const Login: React.FunctionComponent<{}> = () => {
    const [user, setUser] = useSession();
    const history = useHistory();

    const [form, setForm] = useState({
        password: '',
        email: '',
    });

    const onChange: ChangeEventHandler<{ value: string, name: string; }> = (event) => {
        const {value, name} = event.target;
        setForm({...form, [name]: value})
    };

    const onClick: MouseEventHandler = (event) => {
        if (event) {
            event.preventDefault();
        }

        fetchLogin(form)
            .then(user => {
                setUser(user);
                history.push('/');
            })
            .catch(error => {
                console.error('error', error);
            })
    };

    return <Page>
        <form>
            <div>
                <label htmlFor="email-input">Email</label>
                <input value={form.email}
                       onChange={onChange}
                       id="email-input"
                       type="text"
                       name="email"/>
            </div>
            <div>
                <label htmlFor="password-input">Password</label>
                <input value={form.password}
                       onChange={onChange}
                       id="password-input"
                       type="password"
                       name="password"/>
            </div>

            <button onClick={onClick}>Login</button>
        </form>
    </Page>
};