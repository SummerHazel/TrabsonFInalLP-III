const routes = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/inscrever',
    component: () => import('pages/Inscrever.vue')
  },
  
    {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') }, 
      {
        path: '/sobre',
          component: () => import('pages/SobrePage.vue')
      },
      {
        path: '/servicos',
        component: () => import('pages/ServicosPage.vue')
      },
      {
        path: '/contatos',
        component: () => import('pages/ContatosPage.vue') 
      },
      {
        path: '/produtos',
        component: () => import('pages/ProdutosPage.vue') 
      },
      {
        path: '/agendar',
        component: () => import('pages/AgendamentosPage.vue') 
      },
      {
        path: '/ConsultaAgendamento',
        component: () => import('pages/ConsultaAgendamentoPage.vue') 
      },
      {
        path: '/CadastroProduto',
        component: () => import('pages/CadastrosProdutoPage.vue') 
      },
      {
        path: '/CadastroServico',
        component: () => import('pages/CadastroServicoPage.vue') 
      },
      {
        path: '/CadastroBarbeiro',
        component: () => import('pages/BarbeirosPage.vue') 
      },
      {
        path: '/homelogin',
        component: () => import('pages/HomeLoginPage.vue') 
      },
      {
        path: '/DashPage',
        component: () => import('pages/Dashbordpage.vue') 
      },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
