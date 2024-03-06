import { Component } from '../../core/src/Component';
import { setAttributes } from '../../core/src/utils/setAttributes';

export class IcLogoInner extends Component {
    constructor(props) {
        super(props);

        const doc = new DOMParser().parseFromString(
            `<svg id="ic-logo" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.5 17.25C31.5 24.5678 25.5678 30.5 18.25 30.5C10.9322 30.5 5 24.5678 5 17.25C5 9.93223 10.9322 4 18.25 4C25.5678 4 31.5 9.93223 31.5 17.25Z" fill="white"/>
            <path d="M61.5 55.4715L47.7469 56L18.5 26.7161L25.6847 19.5L61.5 55.4715Z" fill="white"/>
            <path d="M59.5 32C59.5 47.1878 47.1878 59.5 32 59.5C16.8122 59.5 4.5 47.1878 4.5 32C4.5 16.8122 16.8122 4.5 32 4.5C47.1878 4.5 59.5 16.8122 59.5 32Z" fill="white"/>
            <path d="M57 32C57 45.8071 45.8071 57 32 57C18.1929 57 7 45.8071 7 32C7 18.1929 18.1929 7 32 7C45.8071 7 57 18.1929 57 32Z" fill="#131E20"/>
            <path d="M52 32C52 43.0457 43.0457 52 32 52C20.9543 52 12 43.0457 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32Z" fill="white"/>
            <path d="M55.605 44.15L42.368 57.387L29.131 44.15L42.368 30.913L55.605 44.15Z" fill="white"/>
            <path d="M20 12H27V52H20V12Z" fill="#131E20"/>
            <path d="M40.6941 12L46.3801 16.083L25.6859 44.901L20 40.818L40.6941 12Z" fill="#131E20"/>
            <path d="M21 24C21 23.4477 21.4477 23 22 23H25C25.5523 23 26 23.4477 26 24V29C26 29.5523 25.5523 30 25 30H22C21.4477 30 21 29.5523 21 29V24Z" fill="#D5D9DD"/>
            <path d="M21 32C21 31.4477 21.4477 31 22 31H25C25.5523 31 26 31.4477 26 32V37C26 37.5523 25.5523 38 25 38H22C21.4477 38 21 37.5523 21 37V32Z" fill="#D5D9DD"/>
            <path d="M21 40C21 39.4477 21.4477 39 22 39H25C25.5523 39 26 39.4477 26 40V45C26 45.5523 25.5523 46 25 46H22C21.4477 46 21 45.5523 21 45V40Z" fill="#D5D9DD"/>
            <path d="M21 48C21 47.4477 21.4477 47 22 47H25C25.5523 47 26 47.4477 26 48V53C26 53.5525 25.5523 54 25 54H22C21.4477 54 21 53.5525 21 53V48Z" fill="#D5D9DD"/>
            <path d="M22 24C22 23.4477 22.4477 23 23 23H25C25.5523 23 26 23.4477 26 24V29C26 29.5523 25.5523 30 25 30H23C22.4477 30 22 29.5523 22 29V24Z" fill="white"/>
            <path d="M22 32C22 31.4477 22.4477 31 23 31H25C25.5523 31 26 31.4477 26 32V37C26 37.5523 25.5523 38 25 38H23C22.4477 38 22 37.5523 22 37V32Z" fill="white"/>
            <path d="M22 40C22 39.4477 22.4477 39 23 39H25C25.5523 39 26 39.4477 26 40V45C26 45.5523 25.5523 46 25 46H23C22.4477 46 22 45.5523 22 45V40Z" fill="white"/>
            <path d="M22 48C22 47.4477 22.4477 47 23 47H25C25.5523 47 26 47.4477 26 48V53C26 53.5525 25.5523 54 25 54H23C22.4477 54 22 53.5525 22 53V48Z" fill="white"/>
            <path d="M56.624 53.674L47.1491 54.0365L27 33.9497L31.9498 29L56.624 53.674Z" fill="#131E20"/>
            <path d="M29.5 17.25C29.5 23.4632 24.4632 28.5 18.25 28.5C12.0368 28.5 7 23.4632 7 17.25C7 11.0368 12.0368 6 18.25 6C24.4632 6 29.5 11.0368 29.5 17.25Z" fill="#131E20"/>
            <path d="M27.25 17.25C27.25 22.2206 23.2206 26.25 18.25 26.25C13.2794 26.25 9.25 22.2206 9.25 17.25C9.25 12.2794 13.2794 8.25 18.25 8.25C23.2206 8.25 27.25 12.2794 27.25 17.25Z" fill="#D5D9DD"/>
            <path d="M27.1316 17.25C27.1316 22.1552 23.6853 26.1316 19.4342 26.1316C15.183 26.1316 11.7368 22.1552 11.7368 17.25C11.7368 12.3449 15.183 8.36841 19.4342 8.36841C23.6853 8.36841 27.1316 12.3449 27.1316 17.25Z" fill="white"/>
            <path d="M20.6184 12.5131C20.6184 13.8212 19.5581 14.8816 18.25 14.8816C16.942 14.8816 15.8816 13.8212 15.8816 12.5131C15.8816 11.2051 16.942 10.1447 18.25 10.1447C19.5581 10.1447 20.6184 11.2051 20.6184 12.5131Z" fill="#131E20"/>
            <path d="M25.3553 17.25C25.3553 18.558 24.2949 19.6184 22.9869 19.6184C21.6788 19.6184 20.6184 18.558 20.6184 17.25C20.6184 15.9419 21.6788 14.8816 22.9869 14.8816C24.2949 14.8816 25.3553 15.9419 25.3553 17.25Z" fill="#131E20"/>
            <path d="M19.4342 17.25C19.4342 17.904 18.904 18.4342 18.25 18.4342C17.596 18.4342 17.0658 17.904 17.0658 17.25C17.0658 16.596 17.596 16.0658 18.25 16.0658C18.904 16.0658 19.4342 16.596 19.4342 17.25Z" fill="#131E20"/>
            <path d="M20.6184 21.9869C20.6184 23.2949 19.5581 24.3553 18.25 24.3553C16.942 24.3553 15.8816 23.2949 15.8816 21.9869C15.8816 20.6788 16.942 19.6184 18.25 19.6184C19.5581 19.6184 20.6184 20.6788 20.6184 21.9869Z" fill="#131E20"/>
            <path d="M15.8816 17.25C15.8816 18.558 14.8212 19.6184 13.5131 19.6184C12.2051 19.6184 11.1447 18.558 11.1447 17.25C11.1447 15.9419 12.2051 14.8816 13.5131 14.8816C14.8212 14.8816 15.8816 15.9419 15.8816 17.25Z" fill="#131E20"/>
        </svg>`,
            'image/svg+xml',
        );

        this.element = doc.querySelector('svg#ic-logo');
    }

    render(props = {}) {
        setAttributes(this.element, props);

        return this.element;
    }
}

export const IcLogo = (props) => new IcLogoInner(props);
