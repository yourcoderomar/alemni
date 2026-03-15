const routes = [
  {
    path: '/student',
    component: () => import('layouts/MainLayout.vue'),
    meta: { role: 'student' },
    children: [
      {
        path: '',
        name: 'student-home',
        meta: { bottomNavGroup: 'home' },
        component: () => import('pages/student/StudentHomePage.vue')
      },
      {
        path: 'classes',
        name: 'student-classes',
        meta: { title: 'My learnings', bottomNavGroup: 'classes' },
        component: () => import('pages/student/StudentClassesPage.vue')
      },
      {
        path: 'classes/:id',
        name: 'student-class-details',
        meta: { title: 'Class details', hideHeader: true, bottomNavGroup: 'classes' },
        component: () => import('pages/student/StudentClassDetailsPage.vue')
      },
      {
        path: 'classes/:id/sessions/:sessionId',
        name: 'student-session-details',
        meta: { title: 'Session details', hideHeader: true, bottomNavGroup: 'classes' },
        component: () => import('pages/student/StudentSessionDetailsPage.vue')
      },
      {
        path: 'assignments',
        name: 'student-assignments',
        meta: { title: 'Assignments', bottomNavGroup: 'home' },
        component: () => import('pages/student/StudentAssignmentsPage.vue')
      },
      {
        path: 'teachers',
        name: 'student-teachers',
        meta: { bottomNavGroup: 'teachers' },
        component: () => import('pages/student/StudentTeachersPage.vue')
      },
      {
        path: 'teachers/:id',
        name: 'student-teacher-details',
        meta: { title: 'Teacher details', hideHeader: true, bottomNavGroup: 'teachers' },
        component: () => import('pages/student/StudentTeacherDetailsPage.vue')
      },
      {
        path: 'materials',
        name: 'student-materials',
        meta: { bottomNavGroup: 'home' },
        component: () => import('pages/student/StudentMaterialsPage.vue')
      },
      {
        path: 'quizzes',
        name: 'student-quizzes',
        meta: { bottomNavGroup: 'home' },
        component: () => import('pages/student/StudentQuizzesPage.vue')
      },
      {
        path: 'attendance',
        name: 'student-attendance',
        meta: { bottomNavGroup: 'home' },
        component: () => import('pages/student/StudentAttendancePage.vue')
      },
      {
        path: 'profile',
        name: 'student-profile',
        meta: { bottomNavGroup: 'profile', hideHeader: true },
        component: () => import('pages/student/StudentProfilePage.vue')
      },
      {
        path: 'invite-friends',
        name: 'student-invite-friends',
        meta: { title: 'Invite friends', bottomNavGroup: 'profile' },
        component: () => import('pages/student/StudentInviteFriendsPage.vue')
      },
      {
        path: 'manage-profile',
        name: 'student-manage-profile',
        meta: { title: 'Manage profile', hideHeader: true, bottomNavGroup: 'profile' },
        component: () => import('pages/student/StudentManageProfilePage.vue')
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import('layouts/MainLayout.vue'),
    meta: { role: 'teacher' },
    children: []
  },
  {
    path: '/parent',
    component: () => import('layouts/MainLayout.vue'),
    meta: { role: 'parent' },
    children: []
  },
  {
    path: '/',
    redirect: '/student'
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
