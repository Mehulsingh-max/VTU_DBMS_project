const express = require("express")
const authController = require('../controllers/auth');
const router = express.Router();
const mysql = require("mysql");

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index.hbs', {
      user: req.user
    });
  });

router.get('/register',(req,res) => {
    res.render('register.hbs');
});

router.get('/login',(req,res) => {
    res.render('login.hbs');
});
router.get('/register_admin',(req,res) => {
    res.render('register_admin.hbs');
});
router.get('/admin',(req,res) => {
    res.render('admin.hbs');
});
router.get('/admin_page',(req,res) => {
    res.render('admin_page.ejs');
});
router.get('/profile', authController.isLoggedIn,(req,res) =>{
    if(req.user){
        res.render('profile.hbs',{
            user:req.user,
            id:req.id
        });
        
    }else{
        res.redirect('/login');
    }
    
  })

router.get('/create1',(req,res) => {
    res.render('create1.ejs');
});  
// router.get('/company',(req,res) => {
//     res.render('company.ejs',{result:result});
// }); 


router.post('/create1',(req,res) => {
    const company_name = req.body.company_name;
    const mkt_cap = req.body.mkt_cap;
    const md_ceo = req.body.md_ceo;
    const bid_price = req.body.bid_price;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
         console.log("MYSQL connected.....");
        var query = 'INSERT INTO company(company_name,mkt_cap,md_ceo,bid_price) VALUES ?';
        var values = [
            [company_name,mkt_cap,md_ceo,bid_price]
        ];

        db.query(query,[values],(err,result) => {
                console.log("company registered");
                db.query("SELECT * FROM company",(err,result)=>{
                    res.redirect("/admin_page");
                    
               });
               
        });
             
    }
    })
})



router.get('/admin',(req,res) => {
     res.render('admin.ejs');
});
router.post('/admin',(req,res) => {
    const admin_name = req.body.admin_name;
    const admin_pass = req.body.admin_pass;
    
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
         console.log("MYSQL connected.....");
        var query = 'SELECT * FROM admin_login WHERE admin_name = ? AND admin_pass = ?';
        var values = [
            [admin_name,admin_pass]
        ];

        db.query(query,[values],(err,result) => {
                console.log("Admin verified");
                res.render('create1.ejs');
        });
        }
    })
})
router.get('/company',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM company",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("company.ejs",{ result: result });
                 
            }
        })}
       
    })
});
router.post('/company',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM company",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("company.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});
router.get('/concern',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM support",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("support.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});
router.post('/concern',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM support",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("support.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});

router.post('/sold',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM sold",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("sold.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});

router.post('/resolve',(req,res) => {
    const token_number = req.body.token_number;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            console.log("token number",token_number);
            db.query("DELETE FROM support WHERE token_number = ? ;",token_number,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.redirect('/concern');
                 
            }
        })}
       
    })
    
});

router.get('/exchange',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM currency_exchange",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("exchange.ejs",{ result: result });
                 
            }
        })}
       
    })
});
router.post('/exchange',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM currency_exchange",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("exchange.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});

router.post('/users',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT id,name,email,date_time FROM users",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("users.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});
router.get('/users',(req,res) => {
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT id,name,email,date_time FROM users",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                 res.render("users.ejs",{ result: result });
                 
            }
        })}
       
    })
    
});
router.post('/delete',function(req,res){
    
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            
            const query = "DELETE FROM company WHERE c_id = ?";
            const c_id = req.body.c_id;
            
            db.query(query,c_id,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     
                     res.redirect("/company");
                }}
                    )}}
)})
router.post('/edit',function(req,res){
    const c_id = req.body.c_id;
    res.render('edit.ejs',{c_id:c_id});
});
router.post("/edit_company",function(req,res){
    const c_id = req.body.c_id;
    const company_name = req.body.company_name;
    const mkt_cap = req.body.mkt_cap;
    const md_ceo = req.body.md_ceo;
    const bid_price = req.body.bid_price;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            
            const query = "UPDATE company SET company_name='"+company_name+"', mkt_cap='"+mkt_cap+"',md_ceo='"+md_ceo+"',bid_price='"+bid_price+"' WHERE c_id='"+c_id+"'";
            
            
            db.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     
                     res.redirect("/company");
                }}
                    )}}
)
});
router.post('/edit_exchange',function(req,res){
    const currency_name = req.body.currency_name;
    res.render('edit_exchange.ejs',{currency_name:currency_name});
});
router.post("/edit_exchange_submit",function(req,res){
    const currency_name = req.body.currency_name;
    const exchange_rate = req.body.exchange_rate;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            
            const query = "UPDATE currency_exchange SET exchange_rate='"+exchange_rate+"' WHERE currency_name='"+currency_name+"'";
            
            
            db.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     
                     res.redirect("/exchange");
                }}
                    )}}
)
});
router.post('/edit_user',function(req,res){
    const id = req.body.id;
    res.render('edit_user.ejs',{id:id});
});
router.post("/edit_user_submit",function(req,res){
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            
            const query = "UPDATE users SET name='"+name+"', email='"+email+"' WHERE id='"+id+"'";
            
            
            db.query(query,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     
                     res.redirect("/users");
                }}
                    )}}
)
});
router.post('/add_company',(req,res) => {
    const id = req.body.id;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    console.log(id);
    db.connect((error) => {
        if(error){
        console.log(error);
        }
        else{
            db.query("SELECT * FROM company",(err,result)=>{
            if(err){
                console.log(err);
            }else{
                // result[0].id = parseInt(id);
                 console.log("check if we get id",result);
                 console.log("id we here get",id);
                
                 res.render("add_company.ejs",{ result: result ,id:id});
                 
            }
        })}
       
    })
    
});

router.post('/buy_shares',(req,res) => {
    const id = req.body.id;
    const c_id = req.body.c_id;
    const bid_price = req.body.bid_price;
    const company_name = req.body.company_name;
    res.render('add_form.ejs',{id:id,c_id:c_id,bid_price:bid_price,company_name:company_name});
});
router.get('/shares_bought',(err,res)=>{
    
    res.render('shares_bought.ejs');
});
router.post('/final_buy',function(req,res){
    const c_id = req.body.c_id;
    const company_name = req.body.company_name;
    const id = req.body.id;
    const shares = req.body.shares;
    const bid_price = req.body.bid_price;
    const cur_price = req.body.cur_price;
    
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
   db.connect((error)=>{
    if(error){
        console.log(error);
        }
        else{
            console.log("final id",id);
            var query = 'INSERT INTO holdings(id,c_id,company_name,shares,buy_price) VALUES ?';
            var values = [
            [id,c_id,company_name,shares,bid_price]
        ];
        
            
            
            db.query(query,[values],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                     console.log("shares bought");
                     console.log(result);
                    db.query("",(err,result)=>{
                    res.redirect("/shares_bought");
                })
                }}
                    )}}
)
}
   
);
router.post('/contact_admin',function(req,res){
    const id = req.body.id;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
   db.connect((error)=>{
    if(error){
        console.log(error);
        }
        else{
            console.log(id);
            res.render("contact.ejs",{id:id});
        }}
)
}
   
);
router.post('/sell_share',function(req,res){
    const id = req.body.id;
    const company_name = req.body.company_name;
    const shares = req.body.shares;
    const buy_price = req.body.buy_price;
    const date = req.body.date;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
   db.connect((error)=>{
    if(error){
        console.log(error);
        }
        else{
            console.log(id);
            console.log(date);
            var query='INSERT INTO sold(id,company_name,shares) VALUES ? ;';
            var values=[[id,company_name,shares]];
            db.query(query,[values],(err,result)=>{
                if(err){
                    res.render("soldout.ejs");
                }else{
                    res.redirect('/profile');   
                }
            });
        }}
)
}
   
);
router.post('/submit_concern',function(req,res){
    const id = req.body.id;
    const description = req.body.description;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
   db.connect((error)=>{
    if(error){
        console.log(error);
        }
        else{
            var query='INSERT INTO support(id,concern) VALUES ? ;';
            var values=[[id,description]];
            db.query(query,[values],(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    
                    res.redirect('/profile');
                }
            });
        }}
)
}
   
);

router.post("/holdings",function(req,res){
    const c_id = req.body.c_id;
    const company_name = req.body.company_name;
    const id = req.body.id;
    const name = req.body.name;
    const shares = req.body.shares;
    const bid_price = req.body.bid_price;
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database :process.env.DATABASE
    })
    db.connect((error)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("holdings connected");
            db.query("SELECT DISTINCT(h.company_name),shares,date,buy_price,date  FROM holdings h,company c WHERE id = ?",id,(err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    console.log(bid_price);
                    // db.query("INSERT INTO holdings(buy_price,cur_price) select ");
                    res.render("holdings.ejs",{ result: result,id:id,bid_price:bid_price });
                     
                }
            })
        }
    });
});

router.get('/search',function(req,res){
         const company_name = req.query.company_name;
         const db = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user : process.env.DATABASE_USER,
            password:process.env.DATABASE_PASSWORD,
            database :process.env.DATABASE
        })
        db.connect((error)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(company_name);
                db.query("SELECT * FROM company WHERE company_name LIKE '%"+company_name+"%'",(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.render("search_company.ejs",{result:result});
                    }
                });
            }
        });
});
router.get('/back',(req,res)=>{
    res.redirect("/company");
});
module.exports = router;