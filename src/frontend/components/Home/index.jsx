import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import { AppStateContext } from '../App/AppStateProvider'

const useStyles = makeStyles((theme) => ({
    icon: ({ colorBlueLight }) => ({
        width: 160,
        height: 160,
        marginBottom: theme.spacing(2),
        color: colorBlueLight || theme.palette.text.disabled,
    }),
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: `${theme.spacing(12)}px 0 0 0`,
    },
}))

function Home() {
    // Use context -------------------------------------------------------------
    const appState = React.useContext(AppStateContext)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ colorBlueLight: appState.ui.xtheme.palette.colorBlueLight })

    // Main renderer ===========================================================
    return (
        <Container>
            <Box className={classes.root}>
                <CheckCircleIcon className={classes.icon} size={160} />

                <Typography variant="h3" align="center" gutterBottom>
                    Get started
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, consectetur nisi eaque qui tempora, modi exercitationem natus, maxime hic debitis rem eligendi vero iste incidunt consequuntur dicta eos illum delectus sapiente explicabo! Natus repellendus, tenetur fugiat quibusdam delectus nobis corrupti nesciunt eos commodi pariatur dolorum possimus eaque fuga eligendi consectetur nulla aspernatur recusandae doloremque cum culpa veritatis, laudantium est? Aliquam consequuntur a optio. Placeat laudantium minima accusamus aliquid, soluta, tempora numquam ut quos hic eius ducimus dolorum a dolores fugit cupiditate autem libero sed amet atque illum consequuntur dignissimos, pariatur consequatur ab? Ut, perferendis reprehenderit perspiciatis mollitia dolores velit nisi?
                </Typography>
            </Box>
        </Container>
    )
}

export default Home
