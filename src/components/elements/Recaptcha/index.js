import React from 'react'

export class Recaptcha extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            'id': this.props.id || 'reCaptchaReactElement'
        }
        ,
        this.onRecaptchaLoaded = this.onRecaptchaLoaded.bind(this);
    }
    componentDidMount() {
        let isNotExist = Array.from(document.querySelectorAll('script[src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"]')).length === 0;
        if (isNotExist) {
            let script = document.createElement('script');
            script.src = "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            console.log('recaptcha is added')
        } else {
            console.log('recaptcha is aleady exist')
        }

        //
        window.onloadCallback = this.onRecaptchaLoaded.bind(this)
    }
    //added remove recapthca cause we dont need to let this on the website When we log out we need t remove in order to get new recapthca
    componentWillUnmount() {
        // Remove the reCAPTCHA script
        const script = document.querySelector(
            'script[src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"]'
        );
        if (script) {
            script.remove();
            console.log('recaptcha script removed');
        }

        // Remove the global callback
        delete window.onloadCallback;
        console.log('onloadCallback removed');
    }
    onRecaptchaLoaded() {
        console.log('recaptcha ')
        if (window.grecaptcha) {
            window.grecaptcha.render(this.state.id, {
                'sitekey': '6LeyyN0nAAAAAAQXdwzodg-616QyLDHYIBwlHeCI',
                'callback': token => this.verifyCallback(token)//this.verifyCallback.bind(this),
            })
        }
    }
    reset() {
        console.log('reset')
        window?.grecaptcha?.reset()
    }
    verifyCallback(token) {
        console.log({ token })
        if (typeof this.props.onVerify === 'function') {
            this.props.onVerify(token)
        }
    }
    render() {
        return (
            <div id={this.state.id} ></div>
        )
    }
}

export default Recaptcha