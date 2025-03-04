const express = require('express');
const session = require("express-session");
const { engine } = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const Handlebars = require("handlebars");

Handlebars.registerHelper("times", function(n, block) {
  let accum = "";
  for (let i = 0; i < n; i++) {
    accum += block.fn(i);
  }
  return accum;
});

Handlebars.registerHelper("sub", function(a, b){
  return a - b;
});

Handlebars.registerHelper("range", function (from, to, options) {
  let result = "";
  for (let i = from; i <= to; i++) {
    result += options.fn(i);
  }
  return result;
});

Handlebars.registerHelper("lte", function (a, b) {
  return a <= b;
});

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'handlebars')
app.set("views", path.join(__dirname, "views"))
app.engine('handlebars', engine(''))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static('fotos'))

app.use(
  session({
    secret: "chave-secreta",
    resave: false,
    saveUninitialized: true
  })
);


function checkAuth(req, res, next){
  if (!req.session.user){
    return res.redirect('/')
  }
  next()
}

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
})

//login & Register

//simulação
const users=[];

//pathing login
app.get("/", (req, res) => {
  res.render("login", {layout: false});
});

app.post("/login", (req, res) => {
  const {email, password} = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if(!user){
    return res.render("login", {layout: false}, {error: "Usuário ou senha inválidos"});
  }

  req.session.user = user;
  res.redirect("/home");
});

//pagina home no index
app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("index", { user: req.session.user });
});


//pathing register
app.get("/register", (req, res) => {
  res.render("register", {layout: false});
});

app.post("/register", (req, res) => {
  const {name, birthday, email, password, confirmPassword} = req.body;

  if(password !== confirmPassword){
    return res.render("register",{error:"As senhas não coincidem"});
  }
  if(users.find((u) => u.email === email)) {
    return res.render("register",{error:"Email já cadastrado"});
  }

  users.push({name, email, password});
  res.redirect("/");
});

//logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});



const historico = []
const fakedata = [
  {
    id: 1,
    placa: 'ABC-1234',
    marca:'BMW',
    modelo: 'Série 3 Sport',
    ano: '2021',
    cor: 'Preta',
    proposito: 'Uso pessoal',
    zeroKM: 'Sim',
    conforto: '5',
    lat: '-26.278382',
    long:'-48.865418'
  },
  {
    id: 2,
    placa: 'ABC-1234',
    marca:'Chevrolet',
    modelo: 'Onix',
    ano: '2021',
    cor: 'Prata',
    proposito: 'Veículo para locação',
    zeroKM: 'Sim',
    conforto: '4',
    lat: '-26.278382',
    long:'-48.865418'
  
  },
  {
    id: 3,
    placa: 'ABC-1234',
    marca:'Peugeot',
    modelo: '208',
    ano: '2024',
    cor: 'Preta',
    proposito: 'Veículo para locação',
    zeroKM: 'Não',
    conforto: '3',
    lat: '-26.278382',
    long:'-48.865418'
  },
  {
    id: 4,
    placa: 'ABC-1234',
    marca:'Audi',
    modelo: 'A3',
    ano: '2024',
    cor: 'Vermelho',
    proposito: 'Veículo para locação',
    zeroKM: 'Não',
    conforto: '5',
    lat: '-26.278382',
    long:'-48.865418'
  },
  {
    id: 5,
    placa: 'ABC-1234',
    marca:'Jeep',
    modelo: 'Renegade',
    ano: '2023',
    cor: 'Vermelho',
    proposito: 'Veículo para locação',
    zeroKM: 'Sim',
    conforto: '5',
    lat: '-26.278382',
    long:'-48.865418'
  },



]

app.get('/', function (req, res) {
  res.render('login', {layout: false})
})

app.get('/clientes', checkAuth, function (req, res) {
  res.render('cliente/cliente',
    { listaclientes: fakedata })
})

app.get('/clientes/novo', function (req, res) {
  res.render('cliente/formcliente')
})

app.get('/historico', checkAuth, (req, res) => {
  res.render('historico', {historico})
})

//save do veiculo para edição e adicionar novo
app.post('/clientes/save', function (req, res) {

  let clienteantigo =
    fakedata.find(o => o.id == req.body.id)
    const dataHora = new Date().toLocaleString()

  if (clienteantigo != undefined) {
    clienteantigo.placa = req.body.placa
    clienteantigo.ano = req.body.ano
    clienteantigo.marca = req.body.marca
    clienteantigo.modelo = req.body.modelo
    clienteantigo.cor = req.body.cor
    clienteantigo.proposito = req.body.proposito
    clienteantigo.zeroKM = req.body.zeroKM
    clienteantigo.conforto = req.body.conforto
    clienteantigo.lat = req.body.lat
    clienteantigo.long = req.body.long

    //armazenar historico
    historico.push({
      placa: clienteantigo.placa,
      tipo: "Editado",
      dataHora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    });
    

  } else {
    let maiorId = 0
    
    if (fakedata.length > 0) {
      maiorId = Math.max(...fakedata.map(o => o.id))
    }
    
    
    // let maiorId = Math.max(...fakedata.map(o => o.id))

    let novoCliente = {
      id: maiorId + 1,
      placa: req.body.placa,
      ano: req.body.ano,
      marca: req.body.marca,
      modelo: req.body.modelo,
      cor: req.body.cor,
      proposito: req.body.proposito,
      zeroKM: req.body.zeroKM,
      conforto:req.body.conforto || "0",
      lat: req.body.lat,
      long: req.body.long
    }
    fakedata.push(novoCliente)

    historico.push({
      placa: novoCliente.placa,
      tipo: "Cadastrado",
      dataHora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    });
    

  }
  
  res.redirect('/clientes')

})

app.get('/clientes/alterar/:id', function (req, res) {
  let id = req.params['id']

  let umcliente = fakedata.find(o => o.id == id)

  res.render('cliente/formcliente', { cliente: umcliente })
})

app.get('/clientes/delete/:id', function (req, res) {
  let cliente = fakedata.find(o => o.id == req.params['id'])

  let posicaocliente = fakedata.indexOf(cliente)
  const dataHora = new Date().toLocaleString()

  if (posicaocliente > -1) {
    fakedata.splice(posicaocliente, 1)
    historico.push({
      placa: cliente.placa,
      tipo: "Deletado",
      dataHora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    });
    
    
  }
  res.redirect('/clientes')
})

app.get('/clientes/detalhes/:id', function (req, res){
  let cliente =fakedata.find(o => o.id == req.params.id)

  if (!cliente){
    return res.status(404).json({error: "Veículo não encontrado."})
  }
  res.json(cliente)
})

app.listen(80, () => {
  console.log('Servidor rodando...')
  console.log('http://localhost/')
})

