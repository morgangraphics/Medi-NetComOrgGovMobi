import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Doctor from '@/components/doctor';
import DoctorCalendar from '@/components/doctor/calendar';
import DoctorPatient from '@/components/doctor/patient';
import LoginProcess from '@/components/login';
import LogoutProcess from '@/components/logout';
import Messages from '@/components/utils/messages';
import Patient from '@/components/patient';
import PatientCalendar from '@/components/patient/calendar';
import TestResults from '@/components/patient/test-results';
import Upload from '@/components/utils/upload';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/login',
      component: LoginProcess,
      children: [
        {
          path: 'mfa',
          component: LoginProcess,
        },
      ],
    },
    {
      path: '/logout',
      component: LogoutProcess,
    },
    {
      path: '/doctor/:id',
      component: Doctor,
      children: [
        {
          path: '/',
          component: Messages,
        },
        {
          path: 'calendar',
          component: DoctorCalendar,
        },
        {
          path: 'patients',
          component: DoctorPatient,
        },
      ],
    },
    {
      path: '/patient/:id',
      component: Patient,
      children: [
        {
          path: '/',
          component: Messages,
        },
        {
          path: 'calendar',
          component: PatientCalendar,
        },
        {
          path: 'test-results',
          component: TestResults,
        },
      ],
    },
    {
      path: '/user/:id',
      // component: Index,
    },
    // Catch all - If nothing matches send em home
    {
      path: '*',
      redirect: '/',
    },
  ],
});
