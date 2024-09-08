import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Footer } from './components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<H2>Content of the page</H2>
				<Routes>
					<Route path="/" element={<div>Main page </div>} />
					<Route path="/login" element={<div>Authorisation </div>} />
					<Route path="/register" element={<div>Registration </div>} />
					<Route path="/users" element={<div>Users </div>} />
					<Route path="/post" element={<div>New Post </div>} />
					<Route path="/post/:postId" element={<div>Post </div>} />
					<Route path="*" element={<div>Error </div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
