const floorplanOptions = document.querySelectorAll('.floorplan-option');
    const purposeOptions = document.querySelectorAll('.purpose-option');
    const detailsForm = document.getElementById('detailsForm');
    const nextToPurpose = document.getElementById('nextToPurpose');
    const nextToRequirements = document.getElementById('nextToRequirements');
    const nextToForm = document.getElementById('nextToForm');
    const backToFloorplan=document.getElementById('backToFloorplan');
    const backToPurpose=document.getElementById('backToPurpose');

    let selectedFloorplan = null;
    let selectedPurpose = null;

    // Floorplan Selection
    floorplanOptions.forEach(button => {
        button.addEventListener('click', () => {
            selectedFloorplan = button.dataset.option;
            floorplanOptions.forEach(btn => btn.classList.remove('btn-selected'));
            button.classList.add('btn-selected');
            nextToPurpose.disabled = false;
        });
    });

    // Purpose Selection
    purposeOptions.forEach(button => {
        button.addEventListener('click', () => {
            selectedPurpose = button.dataset.option;
            purposeOptions.forEach(btn => btn.classList.remove('btn-selected'));
            button.classList.add('btn-selected');
            nextToRequirements.disabled = false;
        });
    });



    // Navigation between steps
    nextToPurpose.addEventListener('click', () => {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    });

    backToFloorplan.addEventListener('click',() =>{
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');

    });

    nextToRequirements.addEventListener('click', () => {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.remove('hidden');
    });

    backToPurpose.addEventListener('click',()=>{
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step3').classList.remove('hidden');
        
    });

    nextToForm.addEventListener('click', () => {
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step4').classList.remove('hidden');
    });

    // Form Submission
    detailsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect user requirements
        const kitchenCount = document.querySelector('.kitchen-input').value || 0;
        const wardrobeCount = document.querySelector('.wardrobe-input').value || 0;
        const entertainmentCount = document.querySelector('.entertainment-input').value || 0;
        const studycount=document.querySelector('.StudyUnit-input').value || 0;
        const Crockerycount = document.querySelector('.Crockery-input').value || 0;
        const FalseCeilingCount = document.querySelector('.Falseceling-input').value || 0;
        const Poojacount = document.querySelector('.PoojaUnit-input').value || 0;

        

        // Collect user details
        const formData = {
            floorplan: selectedFloorplan,
            purpose: selectedPurpose,
            kitchenCount,
            wardrobeCount,
            entertainmentCount,
            studycount,
            Crockerycount,
            FalseCeilingCount,
            Poojacount,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            city: document.getElementById('city').value
        };

        console.log("Complete Form Data:", formData);

        // Sending email
        Email.send({
            
            Host: "smtp.elasticemail.com",
            Username: "chinmai.mandala96@gmail.com",
            Password: "179905F87F10E1B82B8394612D9B7DA678CC",
            To: "chinmai.mandala96@gmail.com",
            From: "chinmai.mandala96@gmail.com",
            Subject: "quotation request for spaceble",
            Body: `
                <h4>Form Submission Details</h4>
                <p><strong>Floorplan:</strong> ${formData.floorplan}</p>
                <p><strong>Purpose:</strong> ${formData.purpose}</p>
                <p><strong>Kitchen Count:</strong> ${formData.kitchenCount}</p>
                <p><strong>Wardrobe Count:</strong> ${formData.wardrobeCount}</p>
                <p><strong>Entertainment Count:</strong> ${formData.entertainmentCount}</p>
                <p><strong>Entertainment Count:</strong> ${formData.studycount}</p>
                <p><strong>Entertainment Count:</strong> ${formData.Crockerycount}</p>
                <p><strong>Entertainment Count:</strong> ${formData.FalseCeilingCount}</p>
                <p><strong>Entertainment Count:</strong> ${formData.Poojacount}</p>

                <h4>User Details</h4>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>City:</strong> ${formData.city}</p>
            `,
            Port: 2525,
        })
        
        .then((message) => {
            console.log("Email sent successfully:", message);
            alert("Email sent successfully!");
            document.getElementById('step4').classList.add('hidden');
            document.getElementById('successMessage').classList.remove('hidden');
            document.getElementById('submittedName').innerText = formData.name;
            document.getElementById('submittedEmail').innerText = formData.email;
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
            alert("Failed to send email. Check console for details.");
        });
    });
    // Function to update the quantity
    function updateQuantity(id, change) {
        const quantityElement = document.getElementById(id);
        let currentValue = parseInt(quantityElement.textContent);

        // Update the value, but prevent it from going below 1
        currentValue += change;
        if (currentValue < 0) currentValue = 0;

        // Update the display
        quantityElement.textContent = currentValue;
    }
