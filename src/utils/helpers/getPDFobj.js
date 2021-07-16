import logo from '../../assets/img/min.png'
import Helper from './Helper';
const getPDFobj = (name, id, email, skill_arr) => {
    return {
        watermark: { text: 'IUBAT', color: 'blue', opacity: 0.1, bold: true, italics: false },
        content: [
            {
                image: logo,
                width: 75,
                height: 75,
                style: 'img'
            },
            {
                text: 'IUBAT-COMPUTER SCIENCE & ENGINEERING DEPARTMENT\n',
                style: 'quote'
            },
            {
                text: 'SKILL COMPLETION LIST\n\n',
                style: 'header'
            },
            {
                text: 'STUDENT INFO\n\n',
                style: 'subheader'
            },
            {
                text: `${name}\nID#${id}\nEmail: ${email}\n\n`,
                style: 'subheader'
            },
            { text: '\n\Skill list', style: 'list' },
            {
                ol: skill_arr,
                style: 'list'
            },

        ],
        footer: {
            columns: [
                { text: `\n By CSE-DEPARTMENT,IUBAT-${Helper.getCurrentDate()}`, style: 'footer' }
            ]
        },
        styles: {
            header: {
                fontSize: 16,
                marginBottom: 10,
                alignment: 'center',
                color: '#0F243C'
            },
            subheader: {
                fontSize: 15,
                bold: true,
                alignment: 'center',
            },
            quote: {
                fontSize: 18,
                marginBottom: 5,
                alignment: 'center',
            },
            footer: {
                fontSize: 10,
                marginLeft: 20,
            },
            list: {
                alignment: 'left',
                fontSize: 16,
                marginBottom: 10
            }, img: {
                alignment: 'center',
                marginBottom: 20,
                borderRadius: 50
            }
        }

    }
}

export default getPDFobj