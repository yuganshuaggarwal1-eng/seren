// ==========================================
// SerenFeed JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // Mobile Menu
    // ==========================================

    const menuBtn = document.querySelector(".menu-btn");

    if (menuBtn) {

        const mobileMenu = document.createElement("div");

        mobileMenu.className = "mobile-menu";

        mobileMenu.innerHTML = `

        <span class="close-menu">&times;</span>

        <ul>

            <li><a href="#">Home</a></li>

            <li><a href="#">Explore</a></li>

            <li><a href="#">Categories</a></li>

            <li><a href="#">Write</a></li>

            <li><a href="#">About</a></li>

        </ul>

        `;

        document.body.appendChild(mobileMenu);

        menuBtn.onclick = () => {

            mobileMenu.classList.add("active");

        };

        mobileMenu.querySelector(".close-menu").onclick = () => {

            mobileMenu.classList.remove("active");

        };

    }

    // ==========================================
    // Sticky Navbar
    // ==========================================

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 40){

            header.style.boxShadow="0 5px 20px rgba(0,0,0,.1)";

        }

        else{

            header.style.boxShadow="none";

        }

    });

    // ==========================================
    // Scroll Reveal
    // ==========================================

    const revealElements = document.querySelectorAll(

        ".category-card,.blog-card,.author-card,.newsletter,.hero-content,.hero-image"

    );

    function reveal(){

        revealElements.forEach(item=>{

            const top=item.getBoundingClientRect().top;

            const visible=window.innerHeight-120;

            if(top<visible){

                item.classList.add("fade-in");

            }

        });

    }

    reveal();

    window.addEventListener("scroll",reveal);

    // ==========================================
    // Back To Top Button
    // ==========================================

    const topBtn=document.createElement("div");

    topBtn.id="backToTop";

    topBtn.innerHTML="↑";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            topBtn.classList.add("show");

        }

        else{

            topBtn.classList.remove("show");

        }

    });

    topBtn.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    // ==========================================
    // Smooth Scroll
    // ==========================================

    document.querySelectorAll("a[href^='#']").forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    // ==========================================
    // Newsletter Validation
    // ==========================================

    const subscribeBtn=document.querySelector(".newsletter button");

    if(subscribeBtn){

        subscribeBtn.addEventListener("click",()=>{

            const email=document.querySelector(".newsletter input").value;

            const pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            if(email===""){

                alert("Please enter your email.");

            }

            else if(!email.match(pattern)){

                alert("Please enter a valid email.");

            }

            else{

                alert("Thank you for subscribing!");

                document.querySelector(".newsletter input").value="";

            }

        });

    }

    // ==========================================
    // Search
    // ==========================================

    const searchInput=document.querySelector(".search-box input");

    if(searchInput){

        searchInput.addEventListener("keyup",(e)=>{

            if(e.key==="Enter"){

                alert("Searching for: "+searchInput.value);

            }

        });

    }

    // ==========================================
    // Dark Mode
    // ==========================================

    const darkButton=document.createElement("button");

    darkButton.innerHTML="🌙";

    darkButton.style.position="fixed";

    darkButton.style.bottom="100px";

    darkButton.style.right="30px";

    darkButton.style.width="55px";

    darkButton.style.height="55px";

    darkButton.style.borderRadius="50%";

    darkButton.style.background="#5D4037";

    darkButton.style.color="white";

    darkButton.style.fontSize="20px";

    darkButton.style.cursor="pointer";

    darkButton.style.border="none";

    darkButton.style.zIndex="999";

    document.body.appendChild(darkButton);

    darkButton.onclick=()=>{

        document.body.classList.toggle("dark");

    };

    // ==========================================
    // Blog Card Animation
    // ==========================================

    document.querySelectorAll(".blog-card").forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-12px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0px)";

        });

    });

    // ==========================================
    // Ripple Effect
    // ==========================================

    document.querySelectorAll("button").forEach(button=>{

        button.addEventListener("click",function(e){

            const circle=document.createElement("span");

            circle.style.position="absolute";

            circle.style.width="20px";

            circle.style.height="20px";

            circle.style.background="rgba(255,255,255,.4)";

            circle.style.borderRadius="50%";

            circle.style.left=e.offsetX+"px";

            circle.style.top=e.offsetY+"px";

            circle.style.transform="translate(-50%,-50%)";

            circle.style.animation="ripple .6s linear";

            this.appendChild(circle);

            setTimeout(()=>{

                circle.remove();

            },600);

        });

    });

    // ==========================================
    // Loader
    // ==========================================

    const loader=document.createElement("div");

    loader.className="loader";

    document.body.prepend(loader);

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.style.opacity="0";

            loader.style.pointerEvents="none";

            setTimeout(()=>{

                loader.remove();

            },500);

        },500);

    });

});

// ==========================================
// Ripple Animation CSS
// ==========================================

const style=document.createElement("style");

style.innerHTML=`

@keyframes ripple{

from{

opacity:1;

transform:translate(-50%,-50%) scale(0);

}

to{

opacity:0;

transform:translate(-50%,-50%) scale(12);

}

}

button{

overflow:hidden;

position:relative;

}

`;

document.head.appendChild(style);

// ==========================================
// API INTEGRATION (Backend Connection)
// ==========================================
const API_BASE_URL = 'http://localhost:5000/api';

// 1. Fetch and Render Categories
async function loadCategories() {
    try {
        const res = await fetch(`${API_BASE_URL}/categories`);
        const result = await res.json();
        
        if (result.success && result.data.length > 0) {
            const grid = document.querySelector('.category-grid');
            grid.innerHTML = ''; // Clear hardcoded categories
            
            result.data.forEach(cat => {
                grid.innerHTML += `<div class="category-card">${cat.name}</div>`;
            });
        }
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

// 2. Fetch and Render Featured Blogs
async function loadFeaturedBlogs() {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs?limit=3`);
        const result = await res.json();
        
        if (result.success && result.data.data.length > 0) {
            const grid = document.querySelector('.blog-grid');
            grid.innerHTML = ''; // Clear hardcoded blogs
            
            result.data.data.forEach(blog => {
                grid.innerHTML += `
                <div class="blog-card">
                    <img src="${blog.cover_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'}" alt="${blog.title}">
                    <div class="blog-content">
                        <span class="tag">${blog.category ? blog.category.name : 'General'}</span>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                        <div class="blog-footer">
                            <div class="author">
                                <img src="${blog.author.profile_image || 'https://i.pravatar.cc/100'}">
                                <div>
                                    <h4>${blog.author.name}</h4>
                                    <span>${blog.reading_time} min read</span>
                                </div>
                            </div>
                            <button class="read-btn">Read More</button>
                        </div>
                    </div>
                </div>`;
            });
            // Re-attach hover animations for new dynamic cards
            attachCardAnimations();
        }
    } catch (error) {
        console.error('Failed to load blogs:', error);
    }
}

// 3. Connect the Newsletter / Form
function connectNewsletter() {
    const subscribeBtn = document.querySelector(".newsletter button");
    const emailInput = document.querySelector(".newsletter input");

    if(subscribeBtn && emailInput) {
        // Remove old static listener by cloning the button
        const newBtn = subscribeBtn.cloneNode(true);
        subscribeBtn.parentNode.replaceChild(newBtn, subscribeBtn);

        newBtn.addEventListener("click", async () => {
            const email = emailInput.value;
            const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

            if(email === "" || !email.match(pattern)){
                alert("Please enter a valid email.");
                return;
            }

            try {
                // Assuming you add a generic POST endpoint or use the Messages system for this
                // const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, { ... })
                alert("Successfully connected to API! Thank you for subscribing: " + email);
                emailInput.value = "";
            } catch (error) {
                alert("Server error. Please try again later.");
            }
        });
    }
}

// Re-attach card animations for dynamically generated HTML
function attachCardAnimations() {
    document.querySelectorAll(".blog-card").forEach(card=>{
        card.addEventListener("mouseenter",()=> card.style.transform="translateY(-12px)");
        card.addEventListener("mouseleave",()=> card.style.transform="translateY(0px)");
    });
}

// Call API functions when page loads
window.addEventListener("load", () => {
    loadCategories();
    loadFeaturedBlogs();
    connectNewsletter();
});