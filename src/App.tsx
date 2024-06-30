import { ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';

import './index.css';
import { WorkShop } from './pages/WorkShop/WorkShop';
import { WorkShopList } from './components/WorkShopList/WorkShopList';
import { IWorkShopCardItem } from './interfaces/IWorkShopCard';
import { WorkShopForm } from './components/WorkShopForm/WorkShopForm';
import { WorkShopInfo } from './components/WorkShopInfo/WorkShopInfo';
import { WorkShopStatsPage } from './pages/WorkShopStats/WorkShopStatsPage';
import { HomePage } from './pages/HomePage/HomePage';
import { WorkShopEdit } from './components/WorkShopEdit/WorkShopEdit';
import { WorkSHOpStudentsPage } from './pages/WorkShopStudentsPage/WorkShopStudentsPage';
import { WorkShopFormPage } from './pages/WorkShopFormPage/WorkShopFormPage';
import { StudentFilledForm } from './components/StudentFilledForm/StudentFilledForm';
import { StudentFilledFormPage } from './pages/StudentFIlledFormPage/StudentFilledFormPage';
import { Admin } from './pages/AdminsPage/Admin';
import { ToastContainer } from 'react-toastify';
import { InstructorTable } from './pages/InstructorsPage/InstructorPage';
import AnalyticsPage from './pages/AnalyticsPage/AnalyticsPage';
import { StudentWorkshopsPage } from './pages/StudentsWorkshopsPage/StudentWorkshopsPage';
import { EvaluationPage } from './pages/EvaluationPage/EvaluationPage';



export const App = (): ReactElement => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />}>
						<Route index element={<Navigate replace to={'login'} />} />
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />
					</Route>
					<Route path='homepage' element={<HomePage/>}/>
					<Route path='admins' element={<Admin/>}/>
					<Route path='students' element={<StudentWorkshopsPage/>}/>
					<Route path='evaluate' element={<EvaluationPage/>}/>
					<Route path='stats' element={<AnalyticsPage/>}/>
					<Route path='intructors' element={<InstructorTable/>}/>
					<Route path="workshop" element={<WorkShop />}>
						<Route index element={<Navigate replace to={'list'} />} />
						<Route
							path="list" element={<WorkShopList/>}
						/>
						<Route path="new" element={<WorkShopForm />} />
						<Route path=":workshopId">
							<Route
								index
								element={<WorkShopInfo />}
							/>
							<Route path='stats' element={<WorkShopStatsPage/>}/>
							<Route path='form' element={<WorkShopFormPage/>}/>
							<Route path='students' element={<WorkSHOpStudentsPage/>}/>
							<Route path='students-filled-form' element={<StudentFilledFormPage/>}/>
							<Route path='edit' element={<WorkShopEdit />} />
						</Route>
					</Route>
					<Route path="*" element={<h4>404 Working on it </h4>} />
				</Routes>
				<ToastContainer/>
			</BrowserRouter>
		</>
	);
};
