// import MaterialModel from '../models/Material.js';
// import exceljs from 'exceljs';
// import { EstiloCelda, EstiloEncabezado } from '../utils/Excel.Style.js';

// export const getMaterials = async (req, res) => {
//   try {
//     const materials = await MaterialModel.find();
//     res.status(200).json(materials);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getMaterial = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const material = await MaterialModel.findById(id);

//     res.status(200).json(material);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const createMaterial = async (req, res) => {
//   try {
//     const { Nombre, Marca, Categoria, UnidadMedida } = req.body;
//     if (!Nombre || !Marca || !Categoria || !UnidadMedida) {
//       return res.status(400).json({ message: 'Faltan datos' });
//     }

//     const newMaterial = {
//       Nombre_Mat: Nombre,
//       Marca,
//       Categoria,
//       UnidadMedida
//     };
//     const createdMaterial = await MaterialModel.create(newMaterial);

//     res.status(201).json(createdMaterial);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// export const createMaterialExcel = async (req, res) => {
//   try {
//     const notas = await MaterialModel.find();
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet('Materiales');

//     worksheet.mergeCells('A1:E1');
//     worksheet.getCell('A1').value = 'Lista de Materiales';
//     worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
//     worksheet.getRow(1).height = 100;

//     // Encabezados
//     worksheet.getCell('A2').value = 'Identificador';
//     worksheet.getCell('B2').value = 'Nombre';
//     worksheet.getCell('C2').value = 'Marca';
//     worksheet.getCell('D2').value = 'Categoria';
//     worksheet.getCell('E2').value = 'Unidad de Medida';

//     // Datos
//     let row = 3;
//     notas.forEach((nota) => {
//       worksheet.getCell('A' + row).value = nota._id;
//       worksheet.getCell('B' + row).value = nota.Nombre_Mat;
//       worksheet.getCell('C' + row).value = nota.Marca;
//       worksheet.getCell('D' + row).value = nota.Categoria;
//       worksheet.getCell('E' + row).value = nota.UnidadMedida;
//       row++;
//     });

//     // Estilos
//     worksheet.getRow(2).eachCell((cell) => {
//       cell.fill = EstiloEncabezado.fill;
//       cell.font = EstiloEncabezado.font;
//       cell.alignment = EstiloEncabezado.alignment;
//       cell.border = EstiloEncabezado.border;
//     });

//     worksheet.eachRow((row) => {
//       row.eachCell((cell) => {
//         cell.font = EstiloCelda.font;
//         cell.alignment = EstiloCelda.alignment;
//         cell.border = EstiloCelda.border;
//       });
//     });

//     // for  de letras
//     const letras = 'ABCDE';
//     for (let i = 0; i < letras.length; i++) {
//       worksheet.getColumn(letras[i]).width = 50;
//     }

//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=DetalleNotas.xlsx');

//     return workbook.xlsx.write(res).then(function () {
//       res.status(200).end();
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
