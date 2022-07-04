//? This custom link component accepts href, className plus any other props, and doesn't require a nested <a> tag because one is automatically added by the component along with any nested child elements ({children})
//* Not used

import NextLink from 'next/link';

function Link({ as, href, children, ...props }) {
    return (
        <NextLink href={href} as={as}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    );
}

export default Link