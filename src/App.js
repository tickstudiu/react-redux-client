import React, {Component} from 'react';
import {Container, Row, Col, Table, Button, Form, FormGroup, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {fetchCurriculums, changeCurriculums, deleteCurriculums, postCurriculums} from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            faculty: '',
        }
    }

    componentDidMount() {
        this.props.fetchCurriculums();
    };


    handleChange = (event) => {
        let name = event.target.name,
            value = event.target.value;

        this.setState({
            [name]: value
        })
    };

    handleDelete = (event) => {
        const id = event.target.id;
        this.props.deleteCurriculums(id);
    };

    handleSubmit = () => {
        this.props.postCurriculums(this.state);
    };

    render() {
        const {handleChange, handleDelete, handleSubmit} = this;
        const {curriculumsList} = this.props.curriculums;
        if (!curriculumsList)
            return (
                <Container>
                    <Row>
                        <Col className="text-center text-muted">
                            <h1 className="display-1 text-muted"><i className="far fa-frown"></i></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <h1 className="display-2 text-muted">404</h1>
                            <p className="lead">Page not found</p>
                            <p className="small">The Page you are looking for doesn't exist or an other error
                                occured.</p>
                            <p className="small">Go to my <a href="https://github.com/tickstudiu" className="text-success">Github</a>, or to <a
                                href="https://www.facebook.com/sliple.ness" className="text-success">facebook.com</a> to ask a question.</p>
                        </Col>
                    </Row>
                </Container>
            );
        else
            return (
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-4 text-uppercase">College of Computing</h1>
                            <hr/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table borderless>
                                <thead>
                                <tr>
                                    <th style={{width: '10px'}}>#</th>
                                    <th style={{width: '40px'}}>Course</th>
                                    <th>Faculty</th>
                                    <th className="mr-auto text-center" style={{width: '100px'}}>option</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    curriculumsList.map((data, index) => {
                                        return <tr key={index}>
                                            <th scope="row">{data.id}</th>
                                            <td className="text-uppercase">{data.course}</td>
                                            <td className="text-uppercase">{data.faculty}</td>
                                            <td><Button outline color="danger" id={data.id}
                                                        onClick={handleDelete}>delete</Button></td>
                                        </tr>

                                    })
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr/>
                            <p className="lead text-mute">Add Curriculum</p>
                            <Form inline>
                                <FormGroup>
                                    <Input type="text" name="course" placeholder="course..." className="mr-2"
                                           onChange={handleChange}/>
                                    <Input type="text" name="faculty" placeholder="faculty..." className="mr-2"
                                           onChange={handleChange}/>
                                </FormGroup>
                                <Button outline color="primary" onClick={handleSubmit}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
    }
}

const mapStateToProps = ({curriculums}) => {
    return {
        curriculums,
    }
};

export default connect(mapStateToProps, {changeCurriculums, fetchCurriculums, deleteCurriculums, postCurriculums})(App);
