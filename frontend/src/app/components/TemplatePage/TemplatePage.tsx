import './TemplatePage.scss'

import React from 'react'
import { Col, Nav, Row } from 'react-bootstrap'
import pagesStore from '../../lib/store/pages-store'
import ColApp from '../../../core/components/ColApp/ColApp'
import routes from '../../lib/routes'

interface ITemplatePage {
    leftLG?: number
    centerLG?: number
    currentPage: number
    component: React.ReactElement
}

export const TemplatePage = (props: ITemplatePage): JSX.Element => {
    const leftLG = props.leftLG ? props.leftLG : 3
    const centerLG = props.centerLG ? props.centerLG : 5

    const prevPage =
        props.currentPage < 1 ? { route: routes.HOME, title: 'Главная' } : pagesStore.examples[props.currentPage - 1]
    const nextPage =
        props.currentPage > pagesStore.examples.length - 2
            ? { route: routes.HOME, title: 'Главная' }
            : pagesStore.examples[props.currentPage + 1]

    return (
        <Row>
            <Col lg={leftLG} md={0}>
                <Nav.Link className={'link-page'} href={prevPage.route}>{`<< ${prevPage.title}`}</Nav.Link>
            </Col>
            <ColApp lg={centerLG} md={12} body={props.component} />
            <Col>
                <Nav.Link className={'link-page'} href={nextPage.route}>{`${nextPage.title} >>`}</Nav.Link>
            </Col>
        </Row>
    )
}
