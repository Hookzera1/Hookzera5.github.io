// Interatividade para todas as páginas
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de hover nos cards de freelancers
    const freelancerCards = document.querySelectorAll('.freelancer-card');
    freelancerCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
  
    // Efeito de hover nos cards de benefícios e depoimentos
    const benefitCards = document.querySelectorAll('.benefit, .testimonial');
    benefitCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });
  
    // Efeito de rolagem suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Filtro de freelancers
    const filterForm = document.querySelector('.filter-form');
    const freelancerList = document.querySelector('.freelancers-list');
  
    if (filterForm && freelancerList) {
      const freelancers = Array.from(freelancerList.children);
  
      filterForm.addEventListener('input', (e) => {
        const searchText = filterForm.querySelector('input').value.toLowerCase();
        const selectedCategory = filterForm.querySelector('select').value.toLowerCase();
  
        freelancers.forEach(freelancer => {
          const name = freelancer.querySelector('h3').textContent.toLowerCase();
          const skills = freelancer.querySelector('.skills').textContent.toLowerCase();
          const category = freelancer.getAttribute('data-category').toLowerCase();
  
          const matchesSearch = name.includes(searchText) || skills.includes(searchText);
          const matchesCategory = selectedCategory === '' || category === selectedCategory;
  
          if (matchesSearch && matchesCategory) {
            freelancer.style.display = 'block';
          } else {
            freelancer.style.display = 'none';
          }
        });
      });
    }
  
    // Filtro de projetos
    const filterFormProjects = document.querySelector('.filter-form');
    const projectList = document.querySelector('.projects-list');
  
    if (filterFormProjects && projectList) {
      const projects = Array.from(projectList.children);
  
      filterFormProjects.addEventListener('input', (e) => {
        const searchText = filterFormProjects.querySelector('input').value.toLowerCase();
        const selectedCategory = filterFormProjects.querySelector('select').value.toLowerCase();
  
        projects.forEach(project => {
          const title = project.querySelector('h3').textContent.toLowerCase();
          const description = project.querySelector('.description').textContent.toLowerCase();
          const category = project.getAttribute('data-category').toLowerCase();
  
          const matchesSearch = title.includes(searchText) || description.includes(searchText);
          const matchesCategory = selectedCategory === '' || category === selectedCategory;
  
          if (matchesSearch && matchesCategory) {
            project.style.display = 'block';
          } else {
            project.style.display = 'none';
          }
        });
      });
    }
  });
  
  // Simulação de banco de dados usando localStorage
  const usersKey = "freelaConnectUsers";
  const projectsKey = "freelaConnectProjects";
  
  // Função para carregar usuários do localStorage
  function loadUsers() {
    const users = localStorage.getItem(usersKey);
    return users ? JSON.parse(users) : [];
  }
  
  // Função para salvar usuários no localStorage
  function saveUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
  }
  
  // Função para carregar projetos do localStorage
  function loadProjects() {
    const projects = localStorage.getItem(projectsKey);
    return projects ? JSON.parse(projects) : [];
  }
  
  // Função para salvar projetos no localStorage
  function saveProjects(projects) {
    localStorage.setItem(projectsKey, JSON.stringify(projects));
  }
  
  // Função para cadastrar um novo usuário
  function registerUser(name, email, password, accountType) {
    const users = loadUsers();
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert("E-mail já cadastrado. Tente fazer login.");
      return;
    }
  
    const newUser = {
      id: Date.now(), // ID único baseado no timestamp
      name,
      email,
      password,
      accountType,
    };
  
    users.push(newUser);
    saveUsers(users);
    alert("Cadastro realizado com sucesso! Faça login para continuar.");
    window.location.href = "login.html"; // Redireciona para a página de login
  }
  
  // Função para fazer login
  function loginUser(email, password) {
    const users = loadUsers();
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Salva o usuário logado
      alert("Login realizado com sucesso!");
      updateHeader(); // Atualiza o cabeçalho
      window.location.href = "index.html"; // Redireciona para a página inicial
    } else {
      alert("E-mail ou senha incorretos.");
    }
  }
  
  // Função para fazer logout
  function logoutUser() {
    localStorage.removeItem("loggedInUser"); // Remove o usuário logado
    updateHeader(); // Atualiza o cabeçalho
    alert("Logout realizado com sucesso!");
    window.location.href = "index.html"; // Redireciona para a página inicial
  }
  
  // Função para atualizar o cabeçalho com base no usuário logado
  function updateHeader() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const publishProjectLink = document.getElementById("publish-project-link");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutButton = document.getElementById("logout-button");
  
    if (loggedInUser) {
      // Oculta os links de Login e Cadastro
      if (loginLink) loginLink.style.display = "none";
      if (registerLink) registerLink.style.display = "none";
  
      // Mostra o link "Publicar Projeto" apenas para clientes
      if (publishProjectLink && loggedInUser.accountType === "cliente") {
        publishProjectLink.style.display = "inline-block";
      }
  
      // Mostra o botão de Logout
      if (logoutButton) logoutButton.style.display = "inline-block";
    } else {
      // Mostra os links de Login e Cadastro
      if (loginLink) loginLink.style.display = "inline-block";
      if (registerLink) registerLink.style.display = "inline-block";
  
      // Oculta o link "Publicar Projeto" e o botão de Logout
      if (publishProjectLink) publishProjectLink.style.display = "none";
      if (logoutButton) logoutButton.style.display = "none";
    }
  }
  
  // Função para publicar um projeto
  function publishProject(title, description, budget, skills, category) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!loggedInUser || loggedInUser.accountType !== "cliente") {
      alert("Apenas clientes podem publicar projetos.");
      return;
    }
  
    const projects = loadProjects();
    const newProject = {
      id: Date.now(), // ID único baseado no timestamp
      title,
      description,
      budget,
      skills,
      category, // Categoria do projeto
      clientId: loggedInUser.id, // Associa o projeto ao cliente
    };
  
    projects.push(newProject);
    saveProjects(projects);
    alert("Projeto publicado com sucesso!");
    window.location.href = "buscar-projetos.html"; // Redireciona para a página de projetos
  }
  
  // Função para buscar projetos
  function searchProjects(searchText, category) {
    const projects = loadProjects();
    return projects.filter(project => {
      const matchesText = project.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = category === "" || project.category.toLowerCase() === category.toLowerCase();
      return matchesText && matchesCategory;
    });
  }
  
  // Função para exibir projetos na página de buscar projetos
  function displayProjects(projects) {
    const projectsList = document.querySelector(".projects-list");
    if (!projectsList) return;
  
    projectsList.innerHTML = projects.map(project => `
      <div class="project-card" data-category="${project.category.toLowerCase()}">
        <h3>${project.title}</h3>
        <p class="description">${project.description}</p>
        <p class="budget">Orçamento: ${project.budget}</p>
        <p class="skills">Habilidades necessárias: ${project.skills}</p>
        <a href="#" class="cta-button">Ver Detalhes</a>
      </div>
    `).join("");
  }
  
  // Eventos da página de cadastro
  document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".auth-form");
  
    if (registerForm && window.location.pathname.includes("cadastro.html")) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;
        const accountType = registerForm.querySelector("select").value;
  
        if (name && email && password && accountType) {
          registerUser(name, email, password, accountType);
        } else {
          alert("Preencha todos os campos.");
        }
      });
    }
  });
  
  // Eventos da página de login
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".auth-form");
  
    if (loginForm && window.location.pathname.includes("login.html")) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;
  
        if (email && password) {
          loginUser(email, password);
        } else {
          alert("Preencha todos os campos.");
        }
      });
    }
  });
  
  // Eventos da página de publicar projeto
  document.addEventListener("DOMContentLoaded", () => {
    const publishForm = document.querySelector(".publish-form");
  
    if (publishForm && window.location.pathname.includes("publicar-projeto.html")) {
      publishForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = publishForm.querySelector('input[type="text"]').value;
        const description = publishForm.querySelector("textarea").value;
        const budget = publishForm.querySelector('input[type="number"]').value;
        const skills = publishForm.querySelector('input[type="text"][placeholder="Habilidades necessárias"]').value;
        const category = publishForm.querySelector("#project-category").value; // Captura a categoria
  
        if (title && description && budget && skills && category) {
          publishProject(title, description, budget, skills, category);
        } else {
          alert("Preencha todos os campos.");
        }
      });
    }
  });
  
  // Eventos da página de buscar projetos
  document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.querySelector(".filter-form");
  
    if (filterForm && window.location.pathname.includes("buscar-projetos.html")) {
      filterForm.addEventListener("input", () => {
        const searchText = filterForm.querySelector('input[type="text"]').value;
        const category = filterForm.querySelector("select").value;
        const projects = searchProjects(searchText, category);
        displayProjects(projects);
      });
  
      // Exibe todos os projetos ao carregar a página
      const projects = loadProjects();
      displayProjects(projects);
    }
  });
  
  // Evento para o botão de Logout
  document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
  
    if (logoutButton) {
      logoutButton.addEventListener("click", logoutUser);
    }
  
    // Atualiza o cabeçalho ao carregar a página
    updateHeader();
  });