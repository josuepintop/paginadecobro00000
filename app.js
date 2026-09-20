const SUPABASE_URL = 'https://cjoxzhfefrsctlwwjosj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_mqR7Fu1dGBSq2Ezmb4owVQ_njk2OJ_a';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const TABLA_SUPABASE = 'cobros-pagos';
const PREFIJO_TIPO = '[tipo:';

function leerColeccionLocal(clave) {
    try {
        const valor = JSON.parse(localStorage.getItem(clave) || '[]');
        return Array.isArray(valor) ? valor : [];
    } catch (error) {
        console.warn(`Se ignoraron datos locales dañados en ${clave}.`, error);
        localStorage.removeItem(clave);
        return [];
    }
}

function leerObjetoLocal(clave) {
    try {
        const valor = JSON.parse(localStorage.getItem(clave) || '{}');
        return valor && typeof valor === 'object' && !Array.isArray(valor) ? valor : {};
    } catch (error) {
        console.warn(`Se ignoraron preferencias locales dañadas en ${clave}.`, error);
        localStorage.removeItem(clave);
        return {};
    }
}

let registros = leerColeccionLocal('registros_cobros');
let tarjetas = leerColeccionLocal('tarjetas_bancarias');
let gananciasSemanales = leerColeccionLocal('ganancias_semanales');
let retirosEfectivo = leerColeccionLocal('retiros_efectivo');
let gastosMios = leerColeccionLocal('gastos_mios');

const form = document.getElementById('registro-form');
const mensajeSaldoRetiroForm = document.getElementById('mensaje-saldo-retiro-form');
const saldoInsuficienteForm = document.getElementById('saldo-insuficiente-form');
const textoSaldoRetiroForm = document.getElementById('texto-saldo-retiro-form');
const tipoInput = document.getElementById('tipo');
const clienteInput = document.getElementById('cliente');
const montoInput = document.getElementById('monto');
const descripcionInput = document.getElementById('descripcion');
const fechaHoraInput = document.getElementById('fechaHora');
const grupoCliente = document.getElementById('grupo-cliente');
const grupoFecha = document.getElementById('grupo-fecha');
const saldoRetiroForm = document.getElementById('saldo-retiro-form');
const saldoRetiroFormValor = document.getElementById('saldo-retiro-form-valor');
const registroIdInput = document.getElementById('registro-id');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const modalEliminar = document.getElementById('modal-eliminar');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnCancelarEliminacion = document.getElementById('btn-cancelar-eliminacion');
const btnConfirmarEliminacion = document.getElementById('btn-confirmar-eliminacion');
const btnConfirmarEliminacionDevolver = document.getElementById('btn-confirmar-eliminacion-devolver');
const modalTituloEliminacion = document.getElementById('modal-titulo');
const modalMensajeEliminacion = document.getElementById('modal-mensaje-eliminacion');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const contenidoAplicacion = document.getElementById('contenido-aplicacion');
const formAcceso = document.getElementById('form-acceso');
const contrasenaInput = document.getElementById('contrasena');
const mensajeAcceso = document.getElementById('mensaje-acceso');
const btnIngresar = document.getElementById('btn-ingresar');
const btnOlvidoContrasena = document.getElementById('btn-olvido-contrasena');
const modalRecuperarContrasena = document.getElementById('modal-recuperar-contrasena');
const formRecuperarContrasena = document.getElementById('form-recuperar-contrasena');
const btnCerrarRecuperacion = document.getElementById('btn-cerrar-recuperacion');
const btnCancelarRecuperacion = document.getElementById('btn-cancelar-recuperacion');
const codigoRecuperacionInput = document.getElementById('codigo-recuperacion');
const camposNuevaContrasena = document.getElementById('campos-nueva-contrasena');
const nuevaContrasenaInput = document.getElementById('nueva-contrasena');
const confirmarContrasenaInput = document.getElementById('confirmar-contrasena');
const mensajeRecuperacion = document.getElementById('mensaje-recuperacion');
const btnConfirmarRecuperacion = document.getElementById('btn-confirmar-recuperacion');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const tarjetasContainer = document.getElementById('tarjetas-container');
const btnAgregarTarjeta = document.getElementById('btn-agregar-tarjeta');
const montoTotalTarjetas = document.getElementById('monto-total-tarjetas');
const montoTotalTarjetasResumen = document.getElementById('monto-total-tarjetas-resumen');
const montoTotalGeneralElement = document.getElementById('monto-total-general');
const montoEfectivoElement = document.getElementById('monto-efectivo');
const cuentaRegresivaDia = document.getElementById('cuenta-regresiva-dia');
const cuentaRegresivaSemana = document.getElementById('cuenta-regresiva-semana');
const cuentaRegresivaMes = document.getElementById('cuenta-regresiva-mes');
const resumenHistorialEfectivo = document.getElementById('resumen-historial-efectivo');
const btnToggleTotales = document.getElementById('btn-toggle-totales');
const btnToggleTotalTarjetas = document.getElementById('btn-toggle-total-tarjetas');
const btnToggleEfectivo = document.getElementById('btn-toggle-efectivo');
const btnVerHistorialEfectivo = document.getElementById('btn-ver-historial-efectivo');
const btnVerHistorialTarjetas = document.getElementById('btn-ver-historial-tarjetas');
const resumenHistorialTarjetas = document.getElementById('resumen-historial-tarjetas');
const modalHistorialRetirosTarjetas = document.getElementById('modal-historial-retiros-tarjetas');
const btnCerrarHistorialRetirosTarjetas = document.getElementById('btn-cerrar-historial-retiros-tarjetas');
const listaHistorialRetirosTarjetas = document.getElementById('lista-historial-retiros-tarjetas');
const btnVerHistorialGastos = document.getElementById('btn-ver-historial-gastos');
const resumenHistorialGastos = document.getElementById('resumen-historial-gastos');
const modalHistorialGastos = document.getElementById('modal-historial-gastos');
const btnCerrarHistorialGastos = document.getElementById('btn-cerrar-historial-gastos');
const listaHistorialGastos = document.getElementById('lista-historial-gastos');
const btnVerMasHistorialGastos = document.getElementById('btn-ver-mas-historial-gastos');
const btnVerHistorialGastosCasa = document.getElementById('btn-ver-historial-gastos-casa');
const resumenHistorialGastosCasa = document.getElementById('resumen-historial-gastos-casa');
const modalHistorialGastosCasa = document.getElementById('modal-historial-gastos-casa');
const btnCerrarHistorialGastosCasa = document.getElementById('btn-cerrar-historial-gastos-casa');
const listaHistorialGastosCasa = document.getElementById('lista-historial-gastos-casa');
const btnVerMasHistorialGastosCasa = document.getElementById('btn-ver-mas-historial-gastos-casa');
const tarjetaDestinoSelect = document.getElementById('tarjeta-destino');
const grupoTarjeta = document.getElementById('grupo-tarjeta');
const grupoComisionRetiroTarjeta = document.getElementById('grupo-comision-retiro-tarjeta');
const comisionRetiroTarjetaInput = document.getElementById('comision-retiro-tarjeta');
const grupoFuenteGasto = document.getElementById('grupo-fuente-gasto');
const fuenteGastoSelect = document.getElementById('fuente-gasto');
const grupoComisionGasto = document.getElementById('grupo-comision-gasto');
const comisionGastoInput = document.getElementById('comision-gasto');
const grupoComisionCobro = document.getElementById('grupo-comision-cobro');
const comisionCobroInput = document.getElementById('comision-cobro');
const grupoTipo = document.getElementById('grupo-tipo');
const modalAgregarTarjeta = document.getElementById('modal-agregar-tarjeta');
const tituloModalTarjeta = document.getElementById('titulo-modal-tarjeta');
const textoGuardarTarjeta = document.getElementById('texto-guardar-tarjeta');
const iconoGuardarTarjeta = document.getElementById('icono-guardar-tarjeta');
const btnGuardarTarjeta = textoGuardarTarjeta.closest('button');
const btnCancelarEdicionTarjeta = document.getElementById('btn-cancelar-edicion-tarjeta');
const modalDetalleTarjeta = document.getElementById('modal-detalle-tarjeta');
const detalleNombreTarjeta = document.getElementById('detalle-nombre-tarjeta');
const detalleSaldoTarjeta = document.getElementById('detalle-saldo-tarjeta');
const inputMontoRetiro = document.getElementById('input-monto-retiro');
const inputComisionRetiro = document.getElementById('input-comision-retiro');
const selectTarjetaRetiro = document.getElementById('select-tarjeta-retiro');
const inputFechaHoraRetiro = document.getElementById('input-fecha-hora-retiro');
const historialRetirosTarjeta = document.getElementById('historial-retiros-tarjeta');
const btnVerHistorialRetiros = document.getElementById('btn-ver-historial-retiros');
const modalHistorialRetiros = document.getElementById('modal-historial-retiros');
const btnCerrarHistorialRetiros = document.getElementById('btn-cerrar-historial-retiros');
const listaHistorialRetirosCompleto = document.getElementById('lista-historial-retiros-completo');
const btnCancelarEdicionRetiro = document.getElementById('btn-cancelar-edicion-retiro');
const textoGuardarRetiro = document.getElementById('texto-guardar-retiro');
const iconoGuardarRetiro = document.getElementById('icono-guardar-retiro');
const modalAgregarGanancia = document.getElementById('modal-agregar-ganancia');
const inputNombreTarjeta = document.getElementById('input-nombre-tarjeta');
const inputMontoTarjeta = document.getElementById('input-monto-tarjeta');
const modalSeleccionarTarjeta = document.getElementById('modal-seleccionar-tarjeta-cobro');
const opcionesTarjetas = document.getElementById('opciones-tarjetas');
const inputComisionTarjeta = document.getElementById('input-comision-tarjeta');
const mensajeSaldoInsuficiente = document.getElementById('mensaje-saldo-insuficiente');
const detalleSaldoInsuficiente = document.getElementById('detalle-saldo-insuficiente');
const modalEditarDestinoCalendario = document.getElementById('modal-editar-destino-calendario');
const inputMontoCalendario = document.getElementById('input-monto-calendario');
const inputComisionCalendario = document.getElementById('input-comision-calendario');
const grupoComisionCalendario = document.getElementById('grupo-comision-calendario');
const selectDestinoCalendario = document.getElementById('select-destino-calendario');
const tablaGananciasSemanales = document.getElementById('tabla-ganancias-semanales');
const btnAgregarGananciaSemanal = document.getElementById('btn-agregar-ganancia-semanal');
const btnVerHistorialCalendario = document.getElementById('btn-ver-historial-calendario');
const btnVerCalendarioRegistros = document.getElementById('btn-ver-calendario-registros');
const modalCalendarioRegistros = document.getElementById('modal-calendario-registros');
const btnCerrarCalendarioRegistros = document.getElementById('btn-cerrar-calendario-registros');
const btnMesAnterior = document.getElementById('btn-mes-anterior');
const btnMesSiguiente = document.getElementById('btn-mes-siguiente');
const mesCalendarioRegistros = document.getElementById('mes-calendario-registros');
const calendarioRegistrosGrid = document.getElementById('calendario-registros-grid');
const detalleDiaRegistros = document.getElementById('detalle-dia-registros');
const modalSeguridadCalendario = document.getElementById('modal-seguridad-calendario');
const formSeguridadCalendario = document.getElementById('form-seguridad-calendario');
const contrasenaCalendarioInput = document.getElementById('contrasena-calendario');
const mensajeSeguridadCalendario = document.getElementById('mensaje-seguridad-calendario');
const btnContinuarSeguridadCalendario = formSeguridadCalendario.querySelector('button[type="submit"]');
const btnCancelarSeguridadCalendario = document.getElementById('btn-cancelar-seguridad-calendario');
const modalEditarCalendarioVisual = document.getElementById('modal-editar-calendario-visual');
const btnCerrarEditarCalendarioVisual = document.getElementById('btn-cerrar-editar-calendario-visual');
const btnCancelarEditarCalendarioVisual = document.getElementById('btn-cancelar-editar-calendario-visual');
const btnGuardarEditarCalendarioVisual = document.getElementById('btn-guardar-editar-calendario-visual');
const inputDescripcionCalendarioVisual = document.getElementById('input-descripcion-calendario-visual');
const inputFechaCalendarioVisual = document.getElementById('input-fecha-calendario-visual');
const inputMontoCalendarioVisual = document.getElementById('input-monto-calendario-visual');
const selectOrigenCalendarioVisual = document.getElementById('select-origen-calendario-visual');
const btnVerOtrosMovimientos = document.getElementById('btn-ver-otros-movimientos');
const listaOtrosMovimientos = document.getElementById('lista-otros-movimientos');
const modalHistorialGrupo = document.getElementById('modal-historial-grupo');
const btnCerrarHistorialGrupo = document.getElementById('btn-cerrar-historial-grupo');
const btnVerMasHistorialGrupo = document.getElementById('btn-ver-mas-historial-grupo');
const listaHistorialGrupo = document.getElementById('lista-historial-grupo');
let historialGrupoItems = [];
let historialGrupoCrearContenido = null;
const modalHistorialCalendario = document.getElementById('modal-historial-calendario');
const btnCerrarHistorialCalendario = document.getElementById('btn-cerrar-historial-calendario');
const listaHistorialCalendarioCompleto = document.getElementById('lista-historial-calendario-completo');
const modalRetiroEfectivo = document.getElementById('modal-retiro-efectivo');
const btnCerrarRetiroEfectivo = document.getElementById('btn-cerrar-retiro-efectivo');
const btnCancelarRetiroEfectivo = document.getElementById('btn-cancelar-retiro-efectivo');
const btnGuardarRetiroEfectivo = document.getElementById('btn-guardar-retiro-efectivo');
const inputMontoRetiroEfectivo = document.getElementById('input-monto-retiro-efectivo');
const inputDescripcionRetiroEfectivo = document.getElementById('input-descripcion-retiro-efectivo');
const inputFechaHoraRetiroEfectivo = document.getElementById('input-fecha-hora-retiro-efectivo');
const detalleSaldoEfectivo = document.getElementById('detalle-saldo-efectivo');
const historialRetirosEfectivo = document.getElementById('historial-retiros-efectivo');
const modalConfirmarRetiroEfectivo = document.getElementById('modal-confirmar-retiro-efectivo');
const btnCerrarConfirmarRetiroEfectivo = document.getElementById('btn-cerrar-confirmar-retiro-efectivo');
const btnCancelarConfirmarRetiro = document.getElementById('btn-cancelar-confirmar-retiro');
const btnConfirmarRetiroEfectivo = document.getElementById('btn-confirmar-retiro-efectivo');
const confirmacionDescripcionRetiro = document.getElementById('confirmacion-descripcion-retiro');
const confirmacionMontoRetiro = document.getElementById('confirmacion-monto-retiro');
const mensajeErrorRetiroConfirmacion = document.getElementById('mensaje-error-retiro-confirmacion');
const confirmacionSaldoInsuficiente = document.getElementById('confirmacion-saldo-insuficiente');
const textoErrorRetiroConfirmacion = document.getElementById('texto-error-retiro-confirmacion');
const modalHistorialRegistros = document.getElementById('modal-historial-registros');
const btnCerrarHistorialRegistros = document.getElementById('btn-cerrar-historial-registros');
const tablaHistorialRegistros = document.getElementById('tabla-historial-registros');
const modalAbonoDeuda = document.getElementById('modal-abono-deuda');
const btnCerrarAbonoDeuda = document.getElementById('btn-cerrar-abono-deuda');
const btnCancelarAbonoDeuda = document.getElementById('btn-cancelar-abono-deuda');
const btnContinuarAbonoDeuda = document.getElementById('btn-continuar-abono-deuda');
const inputMontoAbono = document.getElementById('input-monto-abono');
const inputDescripcionAbono = document.getElementById('input-descripcion-abono');
const inputComisionAbono = document.getElementById('input-comision-abono');
const mensajeAbonoInvalido = document.getElementById('mensaje-abono-invalido');
const abonoTotalDeuda = document.getElementById('abono-total-deuda');
const abonoTotalPagado = document.getElementById('abono-total-pagado');
const abonoTotalFalta = document.getElementById('abono-total-falta');
const listaAbonosDeuda = document.getElementById('lista-abonos-deuda');
const btnVerHistorialAbonos = document.getElementById('btn-ver-historial-abonos');
const modalHistorialAbonos = document.getElementById('modal-historial-abonos');
const btnCerrarHistorialAbonos = document.getElementById('btn-cerrar-historial-abonos');
const listaHistorialAbonosCompleto = document.getElementById('lista-historial-abonos-completo');
const botonesHistorialSeccion = document.querySelectorAll('[data-historial-seccion]');
const checkboxEntrelazarDias = document.getElementById('checkbox-entrelazar-dias');
const checkboxMultiplesTrabajos = document.getElementById('checkbox-multiples-trabajos');
const descripcionesDias = document.getElementById('descripciones-dias');
const inputMontoGanancia = document.getElementById('input-monto-ganancia');
const btnCancelarEdicionGanancia = document.getElementById('btn-cancelar-edicion-ganancia');
const textoGuardarGanancia = document.getElementById('texto-guardar-ganancia');
const iconoGuardarGanancia = document.getElementById('icono-guardar-ganancia');
const modalCancelarEdicion = document.getElementById('modal-cancelar-edicion');
const tituloCancelarEdicion = document.getElementById('titulo-cancelar-edicion');
const mensajeCancelarEdicion = document.getElementById('mensaje-cancelar-edicion');
const btnCerrarCancelarEdicion = document.getElementById('btn-cerrar-cancelar-edicion');
const btnSeguirEditando = document.getElementById('btn-seguir-editando');
const btnConfirmarCancelarEdicion = document.getElementById('btn-confirmar-cancelar-edicion');
let registroPendienteDeEliminar = null;
let tarjetaPendienteDeEliminar = null;
let retiroPendienteDeEliminar = null;
let gastoPendienteDeEliminar = null;
let gananciaPendienteDeEliminar = null;
let devolverDineroAlEliminar = false;
let eliminacionEnCurso = false;
let temporizadorBloqueo = null;
let registroPendienteDeGuardar = null;
let tarjetaSeleccionadaPendiente = null;
let modoCobrarRecibido = false;
let modoAbonoDeuda = false;
let deudaEnAbono = null;
let montoAbonoPendiente = 0;
let abonoEnEdicion = null;
let deudaHistorialAbonos = null;
let abonoEnCambioMetodo = null;
let modoCambioMetodoAbono = false;
let tarjetaDetalleActiva = null;
let retiroEnEdicion = null;
let tarjetaRetiroEnEdicion = null;
let retiroEfectivoEnEdicion = null;
let fechaRetiroEfectivoActual = '';
let gananciaEnEdicion = null;
let tarjetaEnEdicion = null;
let guardandoTarjeta = false;
let tipoEdicionPendienteDeCancelar = null;
let elementoCalendarioEnEdicion = null;
let registroPendienteDePago = null;
let deudaEnReasignacion = null;
let mesCalendarioActual = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let accionSeguridadCalendario = null;
let movimientoCalendarioEnEdicion = null;
let temporizadorCuentaRegresivaDia = null;

function origenBaseRegistro(item) {
    return item.origenTarjetaId || item.tarjetaDestinoId || item.metodo || (item.origenEfectivo || item.destinoEfectivo || item.metodo === 'efectivo' ? 'efectivo' : item.tarjetaId || '');
}

function asegurarBaseEdicionRegistro(item) {
    if (!item || item.baseEdicionRegistro) return;
    item.baseEdicionRegistro = {
        monto: Number(item.monto) || 0,
        descripcion: item.descripcion || item.cliente || '',
        fechaHora: item.fechaHora || '',
        origen: origenBaseRegistro(item),
        comisionTarjeta: Number(item.comisionTarjeta ?? item.comision) || 0
    };
}

function actualizarEstadoEdicionRegistro(item, origen = origenBaseRegistro(item)) {
    asegurarBaseEdicionRegistro(item);
    if (item.fijadoContable) {
        item.modificadoRegistro = false;
        return;
    }
    const base = item.baseEdicionRegistro;
    item.modificadoRegistro = Number(item.monto) !== Number(base.monto) ||
        (item.descripcion || item.cliente || '') !== base.descripcion ||
        (item.fechaHora || '') !== base.fechaHora ||
        origen !== base.origen ||
        (Number(item.comisionTarjeta ?? item.comision) || 0) !== (Number(base.comisionTarjeta) || 0);
}

function etiquetaCampoEdicion(item, campo, texto) {
    if (!item?.baseEdicionRegistro) return '';
    const actual = campo === 'comision' ? Number(item.comisionTarjeta ?? item.comision) || 0 : Number(item.monto) || 0;
    const original = campo === 'comision' ? Number(item.baseEdicionRegistro.comisionTarjeta) || 0 : Number(item.baseEdicionRegistro.monto) || 0;
    const modificado = !item.fijadoContable && actual !== original;
    return `<small class="estado-edicion ${modificado ? 'registro-modificado' : 'registro-original'}">${texto}: ${modificado ? 'Modificado' : 'Original'}</small>`;
}

function normalizarBasesEdicion() {
    [...registros, ...gananciasSemanales, ...retirosEfectivo, ...gastosMios].forEach(item => {
        item.fijadoContable = false;
        asegurarBaseEdicionRegistro(item);
    });
    [...registros, ...gananciasSemanales].forEach(item => (item.abonos || []).forEach(asegurarBaseEdicionRegistro));
    tarjetas.forEach(tarjeta => (tarjeta.retiros || []).forEach(retiro => {
        retiro.fijadoContable = false;
        retiro.tarjetaId = tarjeta.id;
        asegurarBaseEdicionRegistro(retiro);
    }));
}

const CONTRASENA_POR_DEFECTO = '0953690849P';
const CODIGO_RECUPERACION = '095369084906042008';
const CLAVE_SESION = 'sesion_cobros_activa';
const CLAVE_INTENTOS = 'intentos_acceso_cobros';
const CLAVE_BLOQUEO = 'bloqueo_acceso_cobros';
const CLAVE_INTENTOS_RECUPERACION = 'intentos_recuperacion_cobros';
const CLAVE_BLOQUEO_RECUPERACION = 'bloqueo_recuperacion_cobros';
const CLAVE_INTENTOS_SEGURIDAD = 'intentos_seguridad_cobros';
const CLAVE_BLOQUEO_SEGURIDAD = 'bloqueo_seguridad_cobros';
const CLAVE_TOTAL_GENERAL_OCULTO = 'total_general_cobros_oculto';
const CLAVE_TOTAL_TARJETAS_OCULTO = 'total_tarjetas_cobros_oculto';
const CLAVE_EFECTIVO_OCULTO = 'efectivo_cobros_oculto';
const CLAVE_TOTALES_OCULTOS_ANTIGUA = 'totales_cobros_ocultos';
const MARCADOR_PREFERENCIAS_VISIBILIDAD = '[tipo:preferencias_visibilidad]';
const preferenciaOcultaAntigua = localStorage.getItem(CLAVE_TOTALES_OCULTOS_ANTIGUA) === 'true';
let totalGeneralOculto = localStorage.getItem(CLAVE_TOTAL_GENERAL_OCULTO) === 'true' || preferenciaOcultaAntigua;
let totalTarjetasOculto = localStorage.getItem(CLAVE_TOTAL_TARJETAS_OCULTO) === 'true' || preferenciaOcultaAntigua;
let efectivoOculto = localStorage.getItem(CLAVE_EFECTIVO_OCULTO) === 'true' || preferenciaOcultaAntigua;
let tarjetasOcultas = leerObjetoLocal('tarjetas_ocultas');
let idPreferenciasVisibilidad = null;
let contrasenaActual = localStorage.getItem('contrasena_cobros') || CONTRASENA_POR_DEFECTO;
let codigoRecuperacionVerificado = false;
let cargaInicialSupabase = null;
let temporizadorBloqueoRecuperacion = null;
let temporizadorBloqueoSeguridad = null;

function mostrarAplicacion() {
    pantallaBloqueo.hidden = true;
    contenidoAplicacion.hidden = false;
}

function bloquearAplicacion() {
    sessionStorage.removeItem(CLAVE_SESION);
    contenidoAplicacion.hidden = true;
    pantallaBloqueo.hidden = false;
    formAcceso.reset();
    actualizarEstadoBloqueo();
}

function obtenerIntentosFallidos() {
    return Number(sessionStorage.getItem(CLAVE_INTENTOS)) || 0;
}

function obtenerBloqueoHasta() {
    return Number(sessionStorage.getItem(CLAVE_BLOQUEO)) || 0;
}

function actualizarEstadoBloqueo() {
    const bloqueoHasta = obtenerBloqueoHasta();
    const tiempoRestante = bloqueoHasta - Date.now();

    if (tiempoRestante <= 0) {
        clearInterval(temporizadorBloqueo);
        sessionStorage.removeItem(CLAVE_BLOQUEO);
        contrasenaInput.disabled = false;
        btnIngresar.disabled = false;
        mensajeAcceso.textContent = '';
        contrasenaInput.focus();
        return;
    }

    const segundos = Math.ceil(tiempoRestante / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, '0');
    contrasenaInput.disabled = true;
    btnIngresar.disabled = true;
    mensajeAcceso.textContent = `Demasiados intentos. Espera ${minutos}:${segundosRestantes} minutos para volver a intentarlo.`;
}

function iniciarBloqueo(minutos) {
    sessionStorage.setItem(CLAVE_BLOQUEO, String(Date.now() + minutos * 60 * 1000));
    actualizarEstadoBloqueo();
    clearInterval(temporizadorBloqueo);
    temporizadorBloqueo = setInterval(actualizarEstadoBloqueo, 1000);
}

function registrarIntentoFallido() {
    const intentos = obtenerIntentosFallidos() + 1;
    sessionStorage.setItem(CLAVE_INTENTOS, String(intentos));

    if (intentos >= 3) {
        iniciarBloqueo((intentos - 2) * 2);
        return;
    }

    const intentosRestantes = 3 - intentos;
    mensajeAcceso.textContent = `Contraseña incorrecta. Te quedan ${intentosRestantes} intentos antes del bloqueo.`;
}

function obtenerIntentosRecuperacion() {
    return Number(sessionStorage.getItem(CLAVE_INTENTOS_RECUPERACION)) || 0;
}

function obtenerBloqueoRecuperacionHasta() {
    return Number(sessionStorage.getItem(CLAVE_BLOQUEO_RECUPERACION)) || 0;
}

function actualizarEstadoBloqueoRecuperacion() {
    const bloqueoHasta = obtenerBloqueoRecuperacionHasta();
    const tiempoRestante = bloqueoHasta - Date.now();

    if (tiempoRestante <= 0) {
        clearInterval(temporizadorBloqueoRecuperacion);
        sessionStorage.removeItem(CLAVE_BLOQUEO_RECUPERACION);
        codigoRecuperacionInput.disabled = false;
        btnConfirmarRecuperacion.disabled = false;
        return;
    }

    const segundos = Math.ceil(tiempoRestante / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, '0');
    codigoRecuperacionInput.disabled = true;
    btnConfirmarRecuperacion.disabled = true;
    mensajeRecuperacion.textContent = `Demasiados intentos. Espera ${minutos}:${segundosRestantes} minutos para volver a intentarlo.`;
}

function iniciarBloqueoRecuperacion(minutos) {
    sessionStorage.setItem(CLAVE_BLOQUEO_RECUPERACION, String(Date.now() + minutos * 60 * 1000));
    actualizarEstadoBloqueoRecuperacion();
    clearInterval(temporizadorBloqueoRecuperacion);
    temporizadorBloqueoRecuperacion = setInterval(actualizarEstadoBloqueoRecuperacion, 1000);
}

function registrarIntentoFallidoRecuperacion() {
    const intentos = obtenerIntentosRecuperacion() + 1;
    sessionStorage.setItem(CLAVE_INTENTOS_RECUPERACION, String(intentos));

    if (intentos >= 3) {
        iniciarBloqueoRecuperacion((intentos - 2) * 2);
        return;
    }

    mensajeRecuperacion.textContent = `Código incorrecto. Te quedan ${3 - intentos} intentos antes del bloqueo.`;
}

function obtenerIntentosSeguridad() {
    return Number(sessionStorage.getItem(CLAVE_INTENTOS_SEGURIDAD)) || 0;
}

function obtenerBloqueoSeguridadHasta() {
    return Number(sessionStorage.getItem(CLAVE_BLOQUEO_SEGURIDAD)) || 0;
}

function actualizarEstadoBloqueoSeguridad() {
    const tiempoRestante = obtenerBloqueoSeguridadHasta() - Date.now();

    if (tiempoRestante <= 0) {
        clearInterval(temporizadorBloqueoSeguridad);
        sessionStorage.removeItem(CLAVE_BLOQUEO_SEGURIDAD);
        contrasenaCalendarioInput.disabled = false;
        btnContinuarSeguridadCalendario.disabled = false;
        mensajeSeguridadCalendario.textContent = '';
        return;
    }

    const segundos = Math.ceil(tiempoRestante / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, '0');
    contrasenaCalendarioInput.disabled = true;
    btnContinuarSeguridadCalendario.disabled = true;
    mensajeSeguridadCalendario.textContent = `Demasiados intentos. Espera ${minutos}:${segundosRestantes} minutos para volver a intentarlo.`;
}

function iniciarBloqueoSeguridad(minutos) {
    sessionStorage.setItem(CLAVE_BLOQUEO_SEGURIDAD, String(Date.now() + minutos * 60 * 1000));
    actualizarEstadoBloqueoSeguridad();
    clearInterval(temporizadorBloqueoSeguridad);
    temporizadorBloqueoSeguridad = setInterval(actualizarEstadoBloqueoSeguridad, 1000);
}

function registrarIntentoFallidoSeguridad() {
    const intentos = obtenerIntentosSeguridad() + 1;
    sessionStorage.setItem(CLAVE_INTENTOS_SEGURIDAD, String(intentos));

    if (intentos >= 3) {
        iniciarBloqueoSeguridad((intentos - 2) * 2);
        return;
    }

    mensajeSeguridadCalendario.textContent = `Contraseña incorrecta. Te quedan ${3 - intentos} intentos antes del bloqueo.`;
}

actualizarEstadoBloqueo();

if (sessionStorage.getItem(CLAVE_SESION) === 'activa') {
    mostrarAplicacion();
} else {
    bloquearAplicacion();
}

formAcceso.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (cargaInicialSupabase) await cargaInicialSupabase;

    if (contrasenaInput.value === contrasenaActual) {
        sessionStorage.setItem(CLAVE_SESION, 'activa');
        sessionStorage.removeItem(CLAVE_INTENTOS);
        sessionStorage.removeItem(CLAVE_BLOQUEO);
        clearInterval(temporizadorBloqueo);
        mensajeAcceso.textContent = '';
        contrasenaInput.disabled = false;
        btnIngresar.disabled = false;
        mostrarAplicacion();
        return;
    }

    registrarIntentoFallido();
    contrasenaInput.value = '';
    if (!obtenerBloqueoHasta()) {
        contrasenaInput.focus();
    }
});

function cerrarRecuperacion() {
    modalRecuperarContrasena.hidden = true;
    formRecuperarContrasena.reset();
    camposNuevaContrasena.hidden = true;
    nuevaContrasenaInput.required = false;
    confirmarContrasenaInput.required = false;
    codigoRecuperacionVerificado = false;
    mensajeRecuperacion.textContent = '';
    btnConfirmarRecuperacion.innerHTML = '<i class="fa-solid fa-unlock-keyhole"></i> Verificar código';
}

btnOlvidoContrasena.addEventListener('click', function() {
    modalRecuperarContrasena.hidden = false;
    actualizarEstadoBloqueoRecuperacion();
    codigoRecuperacionInput.focus();
});
btnCerrarRecuperacion.addEventListener('click', cerrarRecuperacion);
btnCancelarRecuperacion.addEventListener('click', cerrarRecuperacion);
modalRecuperarContrasena.addEventListener('click', function(event) {
    if (event.target === modalRecuperarContrasena) cerrarRecuperacion();
});

formRecuperarContrasena.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (cargaInicialSupabase) await cargaInicialSupabase;

    if (!codigoRecuperacionVerificado) {
        if (obtenerBloqueoRecuperacionHasta() > Date.now()) {
            actualizarEstadoBloqueoRecuperacion();
            return;
        }

        if (codigoRecuperacionInput.value !== CODIGO_RECUPERACION) {
            registrarIntentoFallidoRecuperacion();
            if (!obtenerBloqueoRecuperacionHasta()) codigoRecuperacionInput.focus();
            return;
        }

        sessionStorage.removeItem(CLAVE_INTENTOS_RECUPERACION);
        sessionStorage.removeItem(CLAVE_BLOQUEO_RECUPERACION);
        clearInterval(temporizadorBloqueoRecuperacion);
        codigoRecuperacionInput.disabled = false;
        btnConfirmarRecuperacion.disabled = false;
        codigoRecuperacionVerificado = true;
        camposNuevaContrasena.hidden = false;
        nuevaContrasenaInput.required = true;
        confirmarContrasenaInput.required = true;
        mensajeRecuperacion.textContent = 'Código verificado. Ahora crea tu nueva contraseña.';
        btnConfirmarRecuperacion.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar nueva contraseña';
        nuevaContrasenaInput.focus();
        return;
    }

    const nuevaContrasena = nuevaContrasenaInput.value.trim();
    if (nuevaContrasena.length < 4) {
        mensajeRecuperacion.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        nuevaContrasenaInput.focus();
        return;
    }
    if (nuevaContrasena !== confirmarContrasenaInput.value.trim()) {
        mensajeRecuperacion.textContent = 'Las contraseñas no coinciden.';
        confirmarContrasenaInput.focus();
        return;
    }

    contrasenaActual = nuevaContrasena;
    localStorage.setItem('contrasena_cobros', contrasenaActual);
    await guardarPreferenciasVisibilidad();
    cerrarRecuperacion();
    mensajeAcceso.textContent = 'Contraseña actualizada. Ya puedes ingresar.';
    mensajeAcceso.style.color = 'var(--green)';
    contrasenaInput.focus();
});

btnCerrarSesion.addEventListener('click', bloquearAplicacion);

function setFechaActual() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    fechaHoraInput.value = now.toISOString().slice(0, 16);
}

setFechaActual();

// Funciones para manejar tarjetas
function renderTarjetas() {
    tarjetasContainer.innerHTML = '';

    if (tarjetas.length === 0) {
        tarjetasContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">No hay tarjetas agregadas. ¡Crea una nueva!</p>';
    } else {
        tarjetas.forEach(tarjeta => {
                    const tarjetaDiv = document.createElement('div');
                    tarjetaDiv.className = 'tarjeta-item';
                    tarjetaDiv.setAttribute('role', 'button');
                    tarjetaDiv.tabIndex = 0;
                    tarjetaDiv.title = 'Abrir opciones e historial de la tarjeta';
                    const estaOculta = Boolean(tarjetasOcultas[String(tarjeta.id)]);
                    const iconoToggle = estaOculta ? 'fa-eye-slash' : 'fa-eye';

                    tarjetaDiv.innerHTML = `
                <div class="tarjeta-nombre">${escaparHtml(tarjeta.nombre)}</div>
                <div class="tarjeta-monto ${estaOculta ? 'oculto' : ''}" id="monto-${tarjeta.id}">
                    ${estaOculta ? '••••••' : `$${tarjeta.monto.toFixed(2)}`}
                </div>
                <div class="tarjeta-acciones">
                    <button type="button" class="btn-pequeno btn-toggle-tarjeta" onclick="toggleMontoTarjeta('${tarjeta.id}')" title="Ocultar/Mostrar monto">
                        <i class="fa-solid ${iconoToggle}"></i>
                    </button>
                    <button type="button" class="btn-pequeno" onclick="editarTarjeta('${tarjeta.id}')">Editar</button>
                    <button type="button" class="btn-pequeno btn-delete" onclick="eliminarTarjeta('${tarjeta.id}')">Eliminar</button>
                </div>
            `;
            tarjetaDiv.addEventListener('click', function(e) {
                if (!e.target.closest('button')) {
                    abrirDetalleTarjeta(tarjeta.id);
                }
            });
            tarjetaDiv.addEventListener('keydown', function(e) {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button')) {
                    e.preventDefault();
                    abrirDetalleTarjeta(tarjeta.id);
                }
            });
            tarjetasContainer.appendChild(tarjetaDiv);
        });
    }
    
    actualizarSelectorTarjetas();
    actualizarSelectorTarjetasRetiro();
    actualizarMontoTotalTarjetas();
}

function toggleMontoTarjeta(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => toggleMontoTarjeta(id, true));
        return;
    }

    const clave = String(id);
    tarjetasOcultas[clave] = !Boolean(tarjetasOcultas[clave]);
    localStorage.setItem('tarjetas_ocultas', JSON.stringify(tarjetasOcultas));
    renderTarjetas();
    guardarPreferenciasVisibilidad();
}

function actualizarMontoTotalTarjetas() {
    const total = tarjetas.reduce((sum, t) => sum + t.monto, 0);
    const valor = totalTarjetasOculto ? '••••••' : `$${total.toFixed(2)}`;
    montoTotalTarjetas.textContent = valor;
    montoTotalTarjetasResumen.textContent = valor;
}

function calcularEfectivoDisponible() {
    let efectivo = 0;
    const movimientos = [...registros, ...gananciasSemanales];
    movimientos.forEach(item => {
        const baseFijada = item.fijadoContable ? item.baseEdicionRegistro : null;
        const montoContable = Number(baseFijada?.monto ?? item.monto) || 0;
        const destinoEfectivoContable = baseFijada ? baseFijada.origen === 'efectivo' : item.destinoEfectivo;
        const origenEfectivoContable = baseFijada ? baseFijada.origen === 'efectivo' : item.origenEfectivo;
        const pagado = item.tipo === 'ganancia_semanal' ? item.estado === 'pagado' : item.tipo === 'cobrado' || item.tipo === 'recibido' && item.estado === 'pagado' || item.estado === 'pagado';
        if (item.tipo === 'deuda' && Array.isArray(item.abonos)) {
            efectivo -= item.abonos
                .filter(abono => abono.metodo === 'efectivo')
                .reduce((total, abono) => total + (Number(abono.monto) || 0), 0);
        }
        if (!pagado) return;
        if (destinoEfectivoContable && (item.tipo === 'cobrado' || item.tipo === 'recibido' || item.tipo === 'ganancia_semanal') ||
            origenEfectivoContable && item.tipo === 'recibido') efectivo += montoContable;
        if (origenEfectivoContable && item.tipo !== 'recibido' && !(item.tipo === 'deuda' && item.abonos?.length)) efectivo -= montoContable;
    });
    retirosEfectivo.forEach(retiro => {
        efectivo -= Number(retiro.fijadoContable ? (retiro.baseEdicionRegistro?.monto ?? retiro.monto) : retiro.monto) || 0;
    });
    gastosMios.forEach(gasto => {
        const montoContable = gasto.fijadoContable ? gasto.baseEdicionRegistro?.monto ?? gasto.monto : gasto.monto;
        const origenEfectivo = gasto.fijadoContable ? gasto.baseEdicionRegistro?.origen === 'efectivo' : gasto.origenEfectivo;
        if (origenEfectivo) efectivo -= Number(montoContable) || 0;
    });
    return efectivo;
}

function actualizarVisibilidadTotales() {
    const actualizarBoton = (boton, oculto, texto) => {
        if (!boton) return;
        boton.setAttribute('aria-label', oculto ? `Mostrar ${texto}` : `Ocultar ${texto}`);
        boton.setAttribute('title', oculto ? `Mostrar ${texto}` : `Ocultar ${texto}`);
        boton.setAttribute('aria-pressed', String(oculto));
        boton.innerHTML = `<i class="fa-solid ${oculto ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    };

    actualizarBoton(btnToggleTotales, totalGeneralOculto, 'el monto total que tienes');
    actualizarBoton(btnToggleTotalTarjetas, totalTarjetasOculto, 'el total en tarjetas');
    actualizarBoton(btnToggleEfectivo, efectivoOculto, 'el efectivo disponible');
    actualizarMontoTotalTarjetas();
    actualizarMontoEfectivo();
}

function actualizarMontoEfectivo() {
    const efectivo = calcularEfectivoDisponible();
    const valor = efectivoOculto ? '••••••' : `$${efectivo.toFixed(2)}`;
    montoEfectivoElement.textContent = valor;
    detalleSaldoEfectivo.textContent = `$${efectivo.toFixed(2)}`;
}

function actualizarMontoTotalActual() {
    const totalActual = calcularEfectivoDisponible() + tarjetas.reduce((total, tarjeta) => total + (Number(tarjeta.monto) || 0), 0);
    montoTotalGeneralElement.textContent = totalGeneralOculto ? '••••••' : `$${totalActual.toFixed(2)}`;
}

function alternarVisibilidadTotalGeneral(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => alternarVisibilidadTotalGeneral(true));
        return;
    }
    totalGeneralOculto = !totalGeneralOculto;
    localStorage.setItem(CLAVE_TOTAL_GENERAL_OCULTO, String(totalGeneralOculto));
    actualizarVisibilidadTotales();
    calcularTotales();
    guardarPreferenciasVisibilidad();
}

function alternarVisibilidadTotalTarjetas(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => alternarVisibilidadTotalTarjetas(true));
        return;
    }
    totalTarjetasOculto = !totalTarjetasOculto;
    localStorage.setItem(CLAVE_TOTAL_TARJETAS_OCULTO, String(totalTarjetasOculto));
    actualizarVisibilidadTotales();
    guardarPreferenciasVisibilidad();
}

function alternarVisibilidadEfectivo(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => alternarVisibilidadEfectivo(true));
        return;
    }
    efectivoOculto = !efectivoOculto;
    localStorage.setItem(CLAVE_EFECTIVO_OCULTO, String(efectivoOculto));
    actualizarVisibilidadTotales();
    guardarPreferenciasVisibilidad();
}

btnToggleTotales.addEventListener('click', () => alternarVisibilidadTotalGeneral());
btnToggleTotalTarjetas.addEventListener('click', () => alternarVisibilidadTotalTarjetas());
btnToggleEfectivo.addEventListener('click', () => alternarVisibilidadEfectivo());

function actualizarSelectorTarjetas() {
    const opcionesActuales = Array.from(tarjetaDestinoSelect.querySelectorAll('option')).slice(1);
    opcionesActuales.forEach(opt => opt.remove());

    tarjetaDestinoSelect.querySelector('option:first-child').textContent = '-- Seleccionar destino --';
    tarjetaDestinoSelect.querySelector('option:first-child').value = '';

    const opcionEfectivo = document.createElement('option');
    opcionEfectivo.value = 'efectivo';
    opcionEfectivo.textContent = `💵 Pago en efectivo ($${calcularEfectivoDisponible().toFixed(2)})`;
    tarjetaDestinoSelect.appendChild(opcionEfectivo);
    
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `${tarjeta.nombre} ($${tarjeta.monto.toFixed(2)})`;
        tarjetaDestinoSelect.appendChild(option);
    });
    actualizarFuenteGasto();
}

function actualizarSaldoEfectivoEnDestino() {
    const opcionEfectivo = tarjetaDestinoSelect?.querySelector('option[value="efectivo"]');
    if (opcionEfectivo) {
        opcionEfectivo.textContent = `💵 Pago en efectivo ($${calcularEfectivoDisponible().toFixed(2)})`;
    }
}

function actualizarDestinoParaRetiroTarjeta() {
    const opcionEfectivo = tarjetaDestinoSelect?.querySelector('option[value="efectivo"]');
    if (!opcionEfectivo) return;
    const esRetiroTarjeta = tipoInput.value === 'retiro_tarjeta';
    opcionEfectivo.hidden = esRetiroTarjeta;
    if (esRetiroTarjeta && tarjetaDestinoSelect.value === 'efectivo') {
        tarjetaDestinoSelect.value = '';
    }
}

function actualizarFuenteGasto() {
    if (!fuenteGastoSelect) return;
    const valorActual = fuenteGastoSelect.value;
    fuenteGastoSelect.innerHTML = `<option value="">-- Seleccionar origen --</option><option value="efectivo">💵 Efectivo ($${calcularEfectivoDisponible().toFixed(2)})</option>`;
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `💳 ${tarjeta.nombre} ($${Number(tarjeta.monto).toFixed(2)})`;
        fuenteGastoSelect.appendChild(option);
    });
    if (valorActual && Array.from(fuenteGastoSelect.options).some(option => option.value === valorActual)) {
        fuenteGastoSelect.value = valorActual;
    }
}

function actualizarSelectorTarjetasRetiro() {
    if (!selectTarjetaRetiro) return;
    selectTarjetaRetiro.innerHTML = '';
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `${tarjeta.nombre} ($${Number(tarjeta.monto).toFixed(2)})`;
        selectTarjetaRetiro.appendChild(option);
    });
}

function abrirModalAgregarTarjeta(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirModalAgregarTarjeta(true));
        return;
    }
    if (guardandoTarjeta) return;
    guardandoTarjeta = false;
    btnGuardarTarjeta.disabled = false;
    tarjetaEnEdicion = null;
    inputNombreTarjeta.value = '';
    inputMontoTarjeta.value = '';
    tituloModalTarjeta.textContent = 'Nueva Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Crear Tarjeta';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = true;
    modalAgregarTarjeta.style.display = 'flex';
    inputNombreTarjeta.focus();
}

function cerrarModalTarjeta(guardadoTerminado = false) {
    if (guardandoTarjeta && !guardadoTerminado) return;
    guardandoTarjeta = false;
    btnGuardarTarjeta.disabled = false;
    modalAgregarTarjeta.style.display = 'none';
    tarjetaEnEdicion = null;
    inputNombreTarjeta.value = '';
    inputMontoTarjeta.value = '';
    tituloModalTarjeta.textContent = 'Nueva Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Crear Tarjeta';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = true;
}

function abrirConfirmacionCancelarEdicion(tipo) {
    tipoEdicionPendienteDeCancelar = tipo;
    const esTarjeta = tipo === 'tarjeta';
    tituloCancelarEdicion.textContent = esTarjeta ? '¿Cancelar la edición de la tarjeta?' : '¿Cancelar la edición del calendario?';
    mensajeCancelarEdicion.textContent = esTarjeta
        ? 'Se perderán los cambios de la tarjeta que todavía no has guardado.'
        : 'Se perderán los cambios de la ganancia que todavía no has guardado.';
    modalCancelarEdicion.hidden = false;
    btnSeguirEditando.focus();
}

function solicitarCancelarGanancia() {
    if (!gananciaEnEdicion) {
        cerrarModalGanancia();
        return;
    }
    abrirConfirmacionCancelarEdicion('ganancia');
}

function cerrarConfirmacionCancelarEdicion() {
    modalCancelarEdicion.hidden = true;
    tipoEdicionPendienteDeCancelar = null;
}

function confirmarCancelarEdicion() {
    const tipo = tipoEdicionPendienteDeCancelar;
    cerrarConfirmacionCancelarEdicion();
    if (tipo === 'tarjeta') cerrarModalTarjeta();
    if (tipo === 'ganancia') cerrarModalGanancia();
}

async function guardarNuevaTarjeta() {
    if (guardandoTarjeta) return;

    guardandoTarjeta = true;
    btnGuardarTarjeta.disabled = true;
    textoGuardarTarjeta.textContent = 'Guardando...';
    iconoGuardarTarjeta.className = 'fa-solid fa-spinner fa-spin';

    const nombre = inputNombreTarjeta.value.trim();
    const monto = parseFloat(inputMontoTarjeta.value) || 0;
    
    if (!nombre) {
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('Por favor ingresa un nombre para la tarjeta');
        inputNombreTarjeta.focus();
        return;
    }
    
    if (monto < 0) {
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('El monto no puede ser negativo');
        inputMontoTarjeta.focus();
        return;
    }
    
    if (tarjetaEnEdicion) {
        tarjetaEnEdicion.nombre = nombre;
        tarjetaEnEdicion.monto = monto;
    } else {
        tarjetas.push({
            id: Date.now().toString(),
            nombre,
            monto,
            retiros: []
        });
    }
    try {
        await sincronizarTarjetasConSupabase();
        localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
        cerrarModalTarjeta(true);
        renderTarjetas();
    } catch (error) {
        console.error('No se pudo guardar la tarjeta:', error);
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('No se pudo guardar la tarjeta. Inténtalo de nuevo.');
    }
}

function editarTarjeta(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => editarTarjeta(id, true));
        return;
    }
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjetaEnEdicion = tarjeta;
    inputNombreTarjeta.value = tarjeta.nombre;
    inputMontoTarjeta.value = Number(tarjeta.monto).toFixed(2);
    tituloModalTarjeta.textContent = 'Editar Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Guardar cambios';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = false;
    modalAgregarTarjeta.style.display = 'flex';
    inputNombreTarjeta.focus();
}

function solicitarCancelarTarjeta() {
    if (guardandoTarjeta) return;
    if (!tarjetaEnEdicion) {
        cerrarModalTarjeta(true);
        return;
    }
    abrirConfirmacionCancelarEdicion('tarjeta');
}

function eliminarTarjeta(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarTarjeta(id, true));
        return;
    }
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjetaPendienteDeEliminar = tarjeta;
    modalTituloEliminacion.textContent = `¿Eliminar la tarjeta “${tarjeta.nombre}”?`;
    modalMensajeEliminacion.textContent = 'Se eliminará su saldo guardado y esta acción no se puede deshacer.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

async function guardarTarjetaEnSupabase(tarjeta) {
    const ahora = new Date();
    const datos = {
        nombre: tarjeta.nombre,
        fecha: ahora.toISOString().slice(0, 10),
        hora: ahora.toTimeString().slice(0, 5),
        monto: tarjeta.monto,
        detalles: `[tipo:tarjeta] [retiros:${encodeURIComponent(JSON.stringify(tarjeta.retiros || []))}]`
    };
    const consulta = tarjeta.id
        ? supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', tarjeta.id).select('id').maybeSingle()
        : supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;
    if (!error && data) {
        tarjeta.id = String(data.id);
        return tarjeta.id;
    }

    if (tarjeta.id) {
        const nuevo = await supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
        if (!nuevo.error) {
            tarjeta.id = String(nuevo.data.id);
            return tarjeta.id;
        }
    }
    console.error('No se pudo guardar la tarjeta en Supabase:', (error || {}).message);
    return null;
}

async function sincronizarTarjetasConSupabase() {
    for (const tarjeta of tarjetas) {
        await guardarTarjetaEnSupabase(tarjeta);
    }
    localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
}

function guardarTarjetas() {
    normalizarBasesEdicion();
    localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
    return sincronizarTarjetasConSupabase();
}

async function eliminarTarjetaDeSupabase(id) {
    if (!id) return;
    const { error } = await supabaseClient.from(TABLA_SUPABASE).delete().eq('id', id);
    if (error) {
        console.error('No se pudo eliminar la tarjeta de Supabase:', error.message);
    }
}

function obtenerFechaHoraLocal() {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
}

function abrirDetalleTarjeta(id) {
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjeta.retiros = Array.isArray(tarjeta.retiros) ? tarjeta.retiros : [];
    tarjetaDetalleActiva = tarjeta;
    detalleNombreTarjeta.textContent = tarjeta.nombre;
    inputMontoRetiro.value = '';
    inputComisionRetiro.value = '';
    actualizarSelectorTarjetasRetiro();
    selectTarjetaRetiro.value = tarjeta.id;
    selectTarjetaRetiro.disabled = false;
    inputFechaHoraRetiro.value = obtenerFechaHoraLocal();
    cancelarEdicionRetiro();
    renderDetalleTarjeta();
    modalDetalleTarjeta.style.display = 'flex';
    inputMontoRetiro.focus();
}

function renderDetalleTarjeta() {
    if (!tarjetaDetalleActiva) return;

    detalleSaldoTarjeta.textContent = `$${tarjetaDetalleActiva.monto.toFixed(2)}`;
    const retiros = [...(tarjetaDetalleActiva.retiros || [])].sort((a, b) =>
        new Date(b.fechaHora) - new Date(a.fechaHora)
    );

    historialRetirosTarjeta.innerHTML = retiros.length === 0
        ? '<p class="historial-vacio">Todavía no hay retiros registrados.</p>'
        : retiros.slice(0, 3).map(retiro => crearHtmlRetiro({ ...retiro, tarjetaId: tarjetaDetalleActiva.id })).join('');
}

function crearHtmlRetiro(retiro) {
    const totalRetiro = Number(retiro.monto) + (Number(retiro.comision) || 0);
    return `
        <div class="retiro-item">
            <div>
                <strong>${retiro.descripcion || 'Retiro de dinero'} ${etiquetaModificacion(retiro)}</strong>
                <span>${new Date(retiro.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span>
                <span class="estados-valor-comision">${etiquetaCampoEdicion(retiro, 'monto', 'Valor')} ${etiquetaCampoEdicion(retiro, 'comision', 'Comisión')}</span>
            </div>
            <div class="retiro-datos">
                <b>-$${totalRetiro.toFixed(2)}</b>
                <div class="retiro-acciones">
                    <button type="button" class="btn-retiro-editar" onclick="editarRetiroTarjeta('${retiro.id}')" title="Editar retiro" aria-label="Editar retiro">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button type="button" class="btn-retiro-eliminar" onclick="eliminarRetiroTarjeta('${retiro.id}')" title="Eliminar retiro" aria-label="Eliminar retiro">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function abrirHistorialRetiros(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialRetiros(true));
        return;
    }
    if (!tarjetaDetalleActiva) return;

    const retiros = [...(tarjetaDetalleActiva.retiros || [])].sort((a, b) =>
        new Date(b.fechaHora) - new Date(a.fechaHora)
    );
    listaHistorialRetirosCompleto.innerHTML = retiros.length === 0
        ? '<p class="historial-vacio">Todavía no hay retiros registrados.</p>'
        : retiros.map(retiro => crearHtmlRetiro({ ...retiro, tarjetaId: tarjetaDetalleActiva.id })).join('');
    modalHistorialRetiros.hidden = false;
    modalHistorialRetiros.style.display = 'flex';
}

function cerrarHistorialRetiros() {
    modalHistorialRetiros.hidden = true;
    modalHistorialRetiros.style.display = 'none';
}

function cerrarModalDetalleTarjeta() {
    modalDetalleTarjeta.style.display = 'none';
    tarjetaDetalleActiva = null;
    cancelarEdicionRetiro();
}

function guardarRetiroTarjeta() {
    if (!tarjetaDetalleActiva) return;

    const monto = parseFloat(inputMontoRetiro.value);
    const comision = Number(inputComisionRetiro.value) || 0;
    const tarjetaSeleccionada = tarjetas.find(tarjeta => tarjeta.id === selectTarjetaRetiro.value);
    const fechaHora = inputFechaHoraRetiro.value;

    if (!tarjetaSeleccionada) {
        alert('Selecciona la tarjeta de la que quieres retirar.');
        selectTarjetaRetiro.focus();
        return;
    }

    if (isNaN(monto) || monto <= 0) {
        alert('Ingresa un monto de retiro válido.');
        inputMontoRetiro.focus();
        return;
    }
    if (!Number.isFinite(comision) || comision < 0) {
        alert('Ingresa una comisión válida.');
        inputComisionRetiro.focus();
        return;
    }
    const totalRetiro = monto + comision;
    const saldoDisponible = tarjetaSeleccionada.monto + (retiroEnEdicion && tarjetaRetiroEnEdicion === tarjetaSeleccionada ? retiroEnEdicion.monto + (Number(retiroEnEdicion.comision) || 0) : 0);
    if (!retiroEnEdicion?.fijadoContable && totalRetiro > saldoDisponible) {
        alert('El retiro no puede ser mayor que el saldo disponible.');
        inputMontoRetiro.focus();
        return;
    }
    if (!fechaHora) {
        alert('Selecciona la fecha y hora del retiro.');
        inputFechaHoraRetiro.focus();
        return;
    }

    if (retiroEnEdicion) {
        if (!retiroEnEdicion.fijadoContable) {
            tarjetaRetiroEnEdicion.monto += retiroEnEdicion.monto + (Number(retiroEnEdicion.comision) || 0);
            if (tarjetaRetiroEnEdicion !== tarjetaSeleccionada) {
                tarjetaSeleccionada.monto -= totalRetiro;
                tarjetaSeleccionada.retiros = Array.isArray(tarjetaSeleccionada.retiros) ? tarjetaSeleccionada.retiros : [];
                tarjetaSeleccionada.retiros.push(retiroEnEdicion);
                tarjetaRetiroEnEdicion.retiros = tarjetaRetiroEnEdicion.retiros.filter(item => item.id !== retiroEnEdicion.id);
            } else {
                tarjetaSeleccionada.monto -= totalRetiro;
            }
        }
        retiroEnEdicion.monto = monto;
        retiroEnEdicion.comision = comision;
        retiroEnEdicion.descripcion = 'Retiro por tarjeta';
        retiroEnEdicion.fechaHora = fechaHora;
        actualizarEstadoEdicionRegistro(retiroEnEdicion, tarjetaSeleccionada.id);
    } else {
        tarjetaSeleccionada.monto -= totalRetiro;
        tarjetaSeleccionada.retiros = Array.isArray(tarjetaSeleccionada.retiros) ? tarjetaSeleccionada.retiros : [];
        tarjetaSeleccionada.retiros.push({
            id: Date.now().toString(),
            monto,
            comision,
            descripcion: 'Retiro por tarjeta',
            fechaHora
        });
    }
    guardarTarjetas();
    renderTarjetas();
    renderResumenHistorialTarjetas();
    cancelarEdicionRetiro();
    tarjetaDetalleActiva = tarjetaSeleccionada;
    detalleNombreTarjeta.textContent = tarjetaSeleccionada.nombre;
    renderDetalleTarjeta();
    inputMontoRetiro.value = '';
    inputComisionRetiro.value = '';
    selectTarjetaRetiro.value = tarjetaDetalleActiva.id;
    inputFechaHoraRetiro.value = obtenerFechaHoraLocal();
}

function editarRetiroTarjeta(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => editarRetiroTarjeta(id, true));
        return;
    }
    if (!tarjetaDetalleActiva) return;

    const retiro = tarjetaDetalleActiva.retiros.find(item => item.id === id);
    if (!retiro) return;

    retiroEnEdicion = retiro;
    tarjetaRetiroEnEdicion = tarjetaDetalleActiva;
    inputMontoRetiro.value = retiro.monto;
    inputComisionRetiro.value = Number(retiro.comision) || 0;
    selectTarjetaRetiro.value = tarjetaDetalleActiva.id;
    selectTarjetaRetiro.disabled = false;
    inputFechaHoraRetiro.value = retiro.fechaHora;
    textoGuardarRetiro.textContent = 'Guardar cambios';
    iconoGuardarRetiro.className = 'fa-solid fa-check';
    btnCancelarEdicionRetiro.hidden = false;
    inputMontoRetiro.focus();
}

function cancelarEdicionRetiro() {
    retiroEnEdicion = null;
    tarjetaRetiroEnEdicion = null;
    if (selectTarjetaRetiro) selectTarjetaRetiro.disabled = false;
    if (textoGuardarRetiro) textoGuardarRetiro.textContent = 'Retirar dinero';
    if (iconoGuardarRetiro) iconoGuardarRetiro.className = 'fa-solid fa-arrow-up-from-bracket';
    if (btnCancelarEdicionRetiro) btnCancelarEdicionRetiro.hidden = true;
}

function eliminarRetiroTarjeta(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarRetiroTarjeta(id, true));
        return;
    }
    if (!tarjetaDetalleActiva) return;

    const retiro = tarjetaDetalleActiva.retiros.find(item => item.id === id);
    if (!retiro) return;

    retiroPendienteDeEliminar = { tarjeta: tarjetaDetalleActiva, retiro };
    modalTituloEliminacion.textContent = '¿Eliminar este retiro?';
    modalMensajeEliminacion.textContent = 'Elige si deseas devolver el monto al saldo de la tarjeta.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

function renderHistorialRetirosEfectivo() {
    const retiros = retirosEfectivo.filter(retiro => !retiro.eliminadoSinDevolver).sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
    historialRetirosEfectivo.innerHTML = retiros.length === 0
        ? '<p class="historial-vacio">Todavía no hay retiros registrados.</p>'
        : retiros.map(retiro => `
            <div class="retiro-item">
                <div><strong>${escaparHtml(retiro.descripcion || 'Retiro de efectivo')} ${etiquetaModificacion(retiro)}</strong><span>${new Date(retiro.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span><span class="estados-valor-comision">${etiquetaCampoEdicion(retiro, 'monto', 'Valor')} ${etiquetaCampoEdicion(retiro, 'comision', 'Comisión')}</span></div>
                <div class="retiro-datos"><b>-$${Number(retiro.monto).toFixed(2)}</b><div class="retiro-acciones">
                    <button type="button" class="btn-retiro-editar" data-retiro-efectivo-editar="${retiro.id}" title="Editar retiro" aria-label="Editar retiro"><i class="fa-solid fa-pen"></i></button>
                    <button type="button" class="btn-retiro-eliminar" data-retiro-efectivo-eliminar="${retiro.id}" title="Eliminar retiro" aria-label="Eliminar retiro"><i class="fa-solid fa-xmark"></i></button>
                </div></div>
            </div>`).join('');
}

function etiquetaModificacion(item) {
    const modificado = Boolean(item.modificadoRegistro || item.modificadoCalendario);
    return `<small class="estado-edicion ${modificado ? 'registro-modificado' : 'registro-original'}">${modificado ? 'Modificado' : 'Original'}</small>`;
}

function movimientoTieneTarjeta(item) {
    return Boolean(item && Number.isFinite(Number(item.monto)));
}

function reconciliarSaldoRegistroEditado(item) {
    if (!item || !item.baseEdicionRegistro) return;
    const base = item.baseEdicionRegistro;
    const montoOriginal = Number(base.monto) || 0;
    const comisionOriginal = Number(base.comisionTarjeta) || 0;
    const montoActual = Number(item.monto) || 0;
    const comisionActual = Number(item.comisionTarjeta ?? item.comision) || 0;
    const pagado = item.tipo === 'cobrado' || item.estado === 'pagado' || item.tipo === 'ganancia_semanal' && item.estado === 'pagado';
    if (!pagado) return;

    if (item.origenTarjetaId || base.origen && base.origen !== 'efectivo' && (item.tipo === 'prestado' || item.tipo === 'deuda' || item.tipo === 'recibido')) {
        const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === base.origen);
        const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === item.origenTarjetaId);
        const gastoOriginal = montoOriginal + comisionOriginal;
        const gastoActual = montoActual + comisionActual;
        if (tarjetaAnterior && tarjetaAnterior === tarjetaNueva) tarjetaAnterior.monto += gastoOriginal - gastoActual;
        else {
            if (tarjetaAnterior) tarjetaAnterior.monto += gastoOriginal;
            if (tarjetaNueva) tarjetaNueva.monto -= gastoActual;
        }
        return;
    }

    if (item.tarjetaDestinoId || base.origen && base.origen !== 'efectivo') {
        const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === base.origen);
        const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === item.tarjetaDestinoId);
        const ingresoOriginal = montoOriginal - comisionOriginal;
        const ingresoActual = montoActual - comisionActual;
        if (tarjetaAnterior && tarjetaAnterior === tarjetaNueva) tarjetaAnterior.monto += ingresoActual - ingresoOriginal;
        else {
            if (tarjetaAnterior) tarjetaAnterior.monto -= ingresoOriginal;
            if (tarjetaNueva) tarjetaNueva.monto += ingresoActual;
        }
    }
}

function crearHtmlRetiroEfectivo(retiro, compacto = false) {
    const acciones = `
        <div class="retiro-acciones">
            ${compacto ? '' : `<button type="button" class="btn-retiro-editar" data-retiro-efectivo-editar="${retiro.id}" title="Editar retiro" aria-label="Editar retiro">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn-retiro-eliminar" data-retiro-efectivo-eliminar="${retiro.id}" title="Eliminar retiro" aria-label="Eliminar retiro">
                <i class="fa-solid fa-xmark"></i>
            </button>`}
        </div>`;
    return `
        <div class="cash-history-item ${compacto ? '' : 'cash-history-item-actions'}">
            <div class="cash-history-icon"><i class="fa-solid fa-arrow-trend-down"></i></div>
            <div class="cash-history-data">
                <strong>${escaparHtml(retiro.descripcion || 'Retiro de efectivo')} ${etiquetaModificacion(retiro)}</strong>
                <span>${new Date(retiro.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span>
                <span class="estados-valor-comision">${etiquetaCampoEdicion(retiro, 'monto', 'Valor')} ${etiquetaCampoEdicion(retiro, 'comision', 'Comisión')}</span>
            </div>
            <div class="retiro-datos"><b>-$${Number(retiro.monto).toFixed(2)}</b>${acciones}</div>
        </div>`;
}

function obtenerRetirosTarjetas() {
    return tarjetas.flatMap(tarjeta => (Array.isArray(tarjeta.retiros) ? tarjeta.retiros : []).map(retiro => ({
        ...retiro,
        tarjetaId: tarjeta.id,
        tarjetaNombre: tarjeta.nombre
    }))).sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
}

function crearHtmlRetiroTarjeta(retiro, compacto = false) {
    const totalRetiro = Number(retiro.monto) + (Number(retiro.comision) || 0);
    const acciones = `
        <div class="retiro-acciones">
            ${compacto ? '' : `<button type="button" class="btn-retiro-editar" data-retiro-tarjeta-editar="${retiro.id}" title="Editar retiro" aria-label="Editar retiro">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="btn-retiro-eliminar" data-retiro-tarjeta-eliminar="${retiro.id}" title="Eliminar retiro" aria-label="Eliminar retiro">
                <i class="fa-solid fa-xmark"></i>
            </button>`}
        </div>`;
    return `
        <div class="retiro-item ${compacto ? 'retiro-tarjeta-resumen' : ''}">
            <div><strong>${escaparHtml(retiro.descripcion || 'Retiro por tarjeta')} ${etiquetaModificacion(retiro)}</strong><span>${escaparHtml(retiro.tarjetaNombre || 'Tarjeta')} · ${new Date(retiro.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span><span class="estados-valor-comision">${etiquetaCampoEdicion(retiro, 'monto', 'Valor')} ${etiquetaCampoEdicion(retiro, 'comision', 'Comisión')}</span></div>
            <div class="retiro-datos"><b>-$${totalRetiro.toFixed(2)}</b>${retiro.comision > 0 ? `<small>Comisión: $${Number(retiro.comision).toFixed(2)}</small>` : ''}${acciones}</div>
        </div>`;
}

function renderResumenHistorialEfectivo() {
    const retiros = [...retirosEfectivo]
        .filter(retiro => !retiro.eliminadoSinDevolver)
        .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
        .slice(0, 3);
    resumenHistorialEfectivo.innerHTML = retiros.length === 0
        ? `<div class="cash-history-empty"><i class="fa-solid fa-wallet"></i><strong>Aún no hay retiros de efectivo</strong><span>Cuando registres una salida, aquí aparecerán tus últimos movimientos.</span></div>`
        : retiros.map(retiro => crearHtmlRetiroEfectivo(retiro, true)).join('');
}

function renderResumenHistorialTarjetas() {
    if (!resumenHistorialTarjetas) return;
    const retiros = obtenerRetirosTarjetas().slice(0, 3);
    resumenHistorialTarjetas.innerHTML = retiros.length === 0
        ? `<div class="cash-history-empty card-history-empty"><i class="fa-solid fa-credit-card"></i><strong>Aún no hay retiros por tarjeta</strong><span>Cuando retires dinero de una tarjeta, aquí aparecerán tus últimos movimientos.</span></div>`
        : retiros.map(retiro => crearHtmlRetiroTarjeta(retiro, true)).join('');
}

function obtenerNombreOrigenGasto(gasto) {
    return gasto.origenEfectivo ? 'Efectivo' : gasto.origenTarjetaNombre || tarjetas.find(tarjeta => tarjeta.id === gasto.origenTarjetaId)?.nombre || 'Tarjeta';
}

function crearHtmlGasto(gasto, compacto = false) {
    const acciones = `
        <div class="retiro-acciones">
            <button type="button" class="btn-retiro-editar" data-gasto-editar="${gasto.id}" title="Editar gasto" aria-label="Editar gasto"><i class="fa-solid fa-pen"></i></button>
            <button type="button" class="btn-retiro-eliminar" data-gasto-eliminar="${gasto.id}" title="Eliminar gasto" aria-label="Eliminar gasto"><i class="fa-solid fa-xmark"></i></button>
        </div>`;
    return `<div class="retiro-item gasto-item" data-gasto-id="${escaparHtml(gasto.id)}">
        <div><strong>${escaparHtml(gasto.descripcion || 'Gasto mío')} ${etiquetaModificacion(gasto)}</strong><span>${escaparHtml(obtenerNombreOrigenGasto(gasto))} · ${new Date(gasto.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span><span class="estados-valor-comision">${etiquetaCampoEdicion(gasto, 'monto', 'Valor')} ${etiquetaCampoEdicion(gasto, 'comision', 'Comisión')}</span></div>
        <div class="retiro-datos"><b>-$${Number(gasto.monto).toFixed(2)}</b>${acciones}</div>
    </div>`;
}

function obtenerGastosCasa() {
    return gastosMios.filter(gasto => gasto.tipo === 'gasto_casa' && !gasto.eliminadoSinDevolver);
}

function obtenerOpcionesOrigenGasto(origenActual) {
    const opciones = [
        `<option value="efectivo" ${origenActual === 'efectivo' ? 'selected' : ''}>Efectivo</option>`
    ];
    tarjetas.forEach(tarjeta => {
        opciones.push(`<option value="${escaparHtml(tarjeta.id)}" ${origenActual === tarjeta.id ? 'selected' : ''}>${escaparHtml(tarjeta.nombre)} ($${Number(tarjeta.monto).toFixed(2)})</option>`);
    });
    return opciones.join('');
}

function crearEditorGastoMio(gasto) {
    const origenActual = gasto.origenEfectivo ? 'efectivo' : gasto.origenTarjetaId;
    const editor = document.createElement('div');
    editor.className = 'gasto-editor-inline';
    editor.innerHTML = `
        <div class="editor-registro-campo"><label>Descripción</label><input type="text" class="gasto-editor-descripcion" value="${escaparHtml(gasto.descripcion || '')}"></div>
        <div class="editor-registro-campo"><label>Monto ($)</label><input type="number" class="gasto-editor-monto" min="0.01" step="0.01" value="${Number(gasto.monto).toFixed(2)}"></div>
        <div class="editor-registro-campo"><label>Fecha y hora</label><input type="datetime-local" class="gasto-editor-fecha" value="${escaparHtml(gasto.fechaHora || '')}"></div>
        <div class="editor-registro-campo"><label>Origen</label><select class="gasto-editor-origen">${obtenerOpcionesOrigenGasto(origenActual)}</select></div>
        <div class="editor-registro-campo"><label>Comisión ($)</label><input type="number" class="gasto-editor-comision" min="0" step="0.01" value="${(Number(gasto.comisionTarjeta) || 0).toFixed(2)}"></div>
        <div class="editor-registro-acciones"><button type="button" class="btn btn-cancel gasto-editor-cancelar">Cancelar</button><button type="button" class="btn btn-save gasto-editor-guardar"><i class="fa-solid fa-check"></i> Guardar</button></div>`;
    editor.querySelector('.gasto-editor-cancelar').addEventListener('click', () => editor.remove());
    editor.querySelector('.gasto-editor-guardar').addEventListener('click', async () => {
        const monto = Number(editor.querySelector('.gasto-editor-monto').value);
        const descripcion = editor.querySelector('.gasto-editor-descripcion').value.trim();
        const fechaHora = editor.querySelector('.gasto-editor-fecha').value;
        const origen = editor.querySelector('.gasto-editor-origen').value;
        const comisionTarjeta = Number(editor.querySelector('.gasto-editor-comision').value) || 0;
        if (!Number.isFinite(monto) || monto <= 0 || !Number.isFinite(comisionTarjeta) || comisionTarjeta < 0 || !descripcion || !fechaHora || !origen) return;
        const saldoDisponible = obtenerSaldoOrigenGasto(origen, gasto);
        if (monto + (origen === 'efectivo' ? 0 : comisionTarjeta) > saldoDisponible) {
            alert(`No hay suficiente dinero en el origen seleccionado. Disponible: $${saldoDisponible.toFixed(2)}.`);
            return;
        }
        if (!gasto.fijadoContable) devolverMontoGastoAlOrigen(gasto);
        gasto.monto = monto;
        gasto.descripcion = descripcion;
        gasto.fechaHora = fechaHora;
        gasto.comisionTarjeta = origen === 'efectivo' ? 0 : comisionTarjeta;
        gasto.origenEfectivo = origen === 'efectivo';
        gasto.origenTarjetaId = gasto.origenEfectivo ? null : origen;
        gasto.origenTarjetaNombre = gasto.origenEfectivo ? 'Efectivo' : tarjetas.find(tarjeta => tarjeta.id === origen)?.nombre || '';
        actualizarEstadoEdicionRegistro(gasto, origen);
        if (!gasto.fijadoContable) descontarMontoGastoDelOrigen(gasto);
        await guardarRegistroEnSupabase(gasto);
        await guardarTarjetas();
        guardarYActualizar();
        if (!modalHistorialRegistros.hidden) abrirOtrosMovimientos();
    });
    return editor;
}

function renderResumenHistorialGastos() {
    if (!resumenHistorialGastos) return;
    const gastos = gastosMios.filter(gasto => gasto.tipo === 'gasto_mio' && !gasto.eliminadoSinDevolver).sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)).slice(0, 3);
    resumenHistorialGastos.innerHTML = gastos.length === 0
        ? '<div class="cash-history-empty gastos-history-empty"><i class="fa-solid fa-bag-shopping"></i><strong>Aún no hay gastos registrados</strong><span>Los gastos que registres aparecerán aquí.</span></div>'
        : gastos.map(gasto => crearHtmlGasto(gasto, true)).join('');
}

function renderResumenHistorialGastosCasa() {
    if (!resumenHistorialGastosCasa) return;
    const gastos = obtenerGastosCasa().sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora)).slice(0, 3);
    resumenHistorialGastosCasa.innerHTML = gastos.length === 0
        ? '<div class="cash-history-empty gastos-history-empty"><i class="fa-solid fa-house-chimney"></i><strong>Aún no hay gastos de casa</strong><span>Los gastos que registres aparecerán aquí.</span></div>'
        : gastos.map(gasto => crearHtmlGasto(gasto, true)).join('');
}

function abrirHistorialGastos(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialGastos(true));
        return;
    }
    const gastos = gastosMios.filter(gasto => gasto.tipo === 'gasto_mio' && !gasto.eliminadoSinDevolver).sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
    listaHistorialGastos.innerHTML = gastos.length === 0
        ? '<p class="historial-vacio">Todavía no hay gastos registrados.</p>'
        : gastos.map((gasto, indice) => `<div class="historial-gasto-fila" ${indice >= 3 ? 'hidden' : ''}>${crearHtmlGasto(gasto)}</div>`).join('');
    btnVerMasHistorialGastos.hidden = gastos.length <= 3;
    btnVerMasHistorialGastos.textContent = 'Ver más';
    btnVerMasHistorialGastos.dataset.expandido = 'false';
    modalHistorialGastos.hidden = false;
    modalHistorialGastos.style.display = 'flex';
}

function abrirHistorialGastosCasa(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialGastosCasa(true));
        return;
    }
    const gastos = obtenerGastosCasa().sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
    listaHistorialGastosCasa.innerHTML = gastos.length === 0
        ? '<p class="historial-vacio">Todavía no hay gastos de casa registrados.</p>'
        : gastos.map((gasto, indice) => `<div class="historial-gasto-fila" ${indice >= 3 ? 'hidden' : ''}>${crearHtmlGasto(gasto)}</div>`).join('');
    btnVerMasHistorialGastosCasa.hidden = gastos.length <= 3;
    btnVerMasHistorialGastosCasa.textContent = 'Ver más';
    btnVerMasHistorialGastosCasa.dataset.expandido = 'false';
    modalHistorialGastosCasa.hidden = false;
    modalHistorialGastosCasa.style.display = 'flex';
}

function cerrarHistorialGastos() {
    modalHistorialGastos.hidden = true;
    modalHistorialGastos.style.display = 'none';
}

function cerrarHistorialGastosCasa() {
    modalHistorialGastosCasa.hidden = true;
    modalHistorialGastosCasa.style.display = 'none';
}

function editarGastoMio(id, contenedor = listaHistorialGastos, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => editarGastoMio(id, contenedor, true));
        return;
    }
    const gasto = gastosMios.find(item => item.id === id);
    if (!gasto || !contenedor) return;
    const fila = contenedor.querySelector(`[data-gasto-id="${CSS.escape(id)}"]`);
    if (!fila || fila.nextElementSibling?.classList.contains('gasto-editor-inline')) return;
    fila.after(crearEditorGastoMio(gasto));
}

function eliminarGastoMio(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarGastoMio(id, true));
        return;
    }
    const gasto = gastosMios.find(item => item.id === id);
    if (!gasto) return;
    gastoPendienteDeEliminar = gasto;
    modalTituloEliminacion.textContent = '¿Eliminar este gasto?';
    modalMensajeEliminacion.textContent = 'Elige si deseas devolver el dinero al origen seleccionado.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

function abrirHistorialRetirosTarjetas(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialRetirosTarjetas(true));
        return;
    }
    const retiros = obtenerRetirosTarjetas();
    listaHistorialRetirosTarjetas.innerHTML = retiros.length === 0
        ? '<p class="historial-vacio">Todavía no hay retiros por tarjeta registrados.</p>'
        : retiros.map(retiro => crearHtmlRetiroTarjeta(retiro)).join('');
    modalHistorialRetirosTarjetas.hidden = false;
    modalHistorialRetirosTarjetas.style.display = 'flex';
}

function cerrarHistorialRetirosTarjetas() {
    modalHistorialRetirosTarjetas.hidden = true;
    modalHistorialRetirosTarjetas.style.display = 'none';
}

function buscarRetiroTarjeta(id) {
    for (const tarjeta of tarjetas) {
        const retiro = (tarjeta.retiros || []).find(item => item.id === id);
        if (retiro) return { tarjeta, retiro };
    }
    return null;
}

function editarRetiroTarjetaDesdeHistorial(id) {
    const encontrado = buscarRetiroTarjeta(id);
    if (!encontrado) return;
    cerrarHistorialRetirosTarjetas();
    abrirDetalleTarjeta(encontrado.tarjeta.id);
    editarRetiroTarjeta(id);
}

function eliminarRetiroTarjetaDesdeHistorial(id) {
    const encontrado = buscarRetiroTarjeta(id);
    if (!encontrado) return;
    cerrarHistorialRetirosTarjetas();
    tarjetaDetalleActiva = encontrado.tarjeta;
    eliminarRetiroTarjeta(id);
}

function abrirHistorialRetirosEfectivo(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialRetirosEfectivo(true));
        return;
    }
    const retiros = retirosEfectivo.filter(retiro => !retiro.eliminadoSinDevolver).sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
    document.getElementById('titulo-historial-retiros').innerHTML = '<i class="fa-solid fa-money-bill-transfer"></i> Historial de efectivo';
    listaHistorialRetirosCompleto.innerHTML = retiros.length === 0
        ? '<p class="historial-vacio">Todavía no hay retiros registrados.</p>'
        : retiros.map(retiro => crearHtmlRetiroEfectivo(retiro)).join('');
    modalHistorialRetiros.hidden = false;
    modalHistorialRetiros.style.display = 'flex';
}

function abrirModalRetiroEfectivo() {
    retiroEfectivoEnEdicion = null;
    fechaRetiroEfectivoActual = obtenerFechaHoraLocal();
    inputMontoRetiroEfectivo.value = '';
    inputDescripcionRetiroEfectivo.value = '';
    inputFechaHoraRetiroEfectivo.value = fechaRetiroEfectivoActual;
    btnGuardarRetiroEfectivo.innerHTML = '<i class="fa-solid fa-check"></i> Guardar retiro';
    actualizarMontoEfectivo();
    renderHistorialRetirosEfectivo();
    modalRetiroEfectivo.hidden = false;
    modalRetiroEfectivo.style.display = 'flex';
    inputMontoRetiroEfectivo.focus();
}

function cerrarModalRetiroEfectivo() {
    modalRetiroEfectivo.hidden = true;
    modalRetiroEfectivo.style.display = 'none';
    retiroEfectivoEnEdicion = null;
}

function abrirConfirmacionRetiroEfectivo(monto, descripcion, fechaHora) {
    fechaRetiroEfectivoActual = fechaHora || obtenerFechaHoraLocal();
    inputMontoRetiroEfectivo.value = monto;
    inputDescripcionRetiroEfectivo.value = descripcion;
    inputFechaHoraRetiroEfectivo.value = fechaRetiroEfectivoActual;
    mensajeErrorRetiroConfirmacion.hidden = true;
    confirmacionSaldoInsuficiente.hidden = true;
    confirmacionDescripcionRetiro.textContent = descripcion;
    confirmacionMontoRetiro.textContent = `$${Number(monto).toFixed(2)}`;
    modalConfirmarRetiroEfectivo.hidden = false;
    modalConfirmarRetiroEfectivo.style.display = 'flex';
    btnConfirmarRetiroEfectivo.focus();
}

function cerrarConfirmacionRetiroEfectivo() {
    modalConfirmarRetiroEfectivo.hidden = true;
    modalConfirmarRetiroEfectivo.style.display = 'none';
}

function limpiarAvisosSaldoRetiro() {
    mensajeSaldoRetiroForm.hidden = true;
    saldoInsuficienteForm.hidden = true;
    mensajeErrorRetiroConfirmacion.hidden = true;
    confirmacionSaldoInsuficiente.hidden = true;
}

function mostrarSaldoInsuficienteEnFormulario(monto, saldoDisponible) {
    const faltante = Math.max(0, monto - saldoDisponible);
    textoSaldoRetiroForm.textContent = `El retiro no puede ser mayor que el efectivo disponible. Faltan $${faltante.toFixed(2)} para realizar este retiro.`;
    saldoInsuficienteForm.querySelector('span').textContent = `Saldo insuficiente. Faltan $${faltante.toFixed(2)}.`;
    mensajeSaldoRetiroForm.hidden = false;
    saldoInsuficienteForm.hidden = false;
    montoInput.focus();
}

function mostrarSaldoInsuficienteEnConfirmacion(monto, saldoDisponible) {
    const faltante = Math.max(0, monto - saldoDisponible);
    textoErrorRetiroConfirmacion.textContent = `El retiro no puede ser mayor que el efectivo disponible. Faltan $${faltante.toFixed(2)} para realizar este retiro.`;
    confirmacionSaldoInsuficiente.querySelector('span').textContent = `Saldo insuficiente. Faltan $${faltante.toFixed(2)}.`;
    mensajeErrorRetiroConfirmacion.hidden = false;
    confirmacionSaldoInsuficiente.hidden = false;
}

async function guardarRetiroEfectivo() {
    const monto = Number(inputMontoRetiroEfectivo.value);
    const descripcion = inputDescripcionRetiroEfectivo.value.trim();
    const fechaHora = inputFechaHoraRetiroEfectivo.value || fechaRetiroEfectivoActual || obtenerFechaHoraLocal();
    if (!descripcion) {
        alert('Escribe una descripción para el retiro.');
        inputDescripcionRetiroEfectivo.focus();
        return;
    }
    const saldoDisponible = calcularEfectivoDisponible() + (retiroEfectivoEnEdicion ? Number(retiroEfectivoEnEdicion.monto) : 0);
    if (!Number.isFinite(monto) || monto <= 0) {
        alert('Ingresa un monto de retiro válido.');
        return;
    }
    if (!retiroEfectivoEnEdicion?.fijadoContable && monto > saldoDisponible) {
        mostrarSaldoInsuficienteEnConfirmacion(monto, saldoDisponible);
        return;
    }
    if (!fechaHora) {
        alert('Selecciona la fecha y hora del retiro.');
        return;
    }

    const retiro = retiroEfectivoEnEdicion || {
        id: undefined,
        tipo: 'retiro_efectivo',
        cliente: 'Retiro de efectivo',
        enCalendario: true
    };
    retiro.monto = monto;
    retiro.descripcion = descripcion;
    retiro.fechaHora = fechaHora;
    retiro.estado = 'pagado';
    if (retiroEfectivoEnEdicion) actualizarEstadoEdicionRegistro(retiro);
    const id = await guardarRegistroEnSupabase(retiro);
    if (!id) return;
    retiro.id = id;
    if (!retiroEfectivoEnEdicion) retirosEfectivo.unshift(retiro);
    localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
    guardarYActualizar();
    resetFormulario();
    cerrarConfirmacionRetiroEfectivo();
}

function editarRetiroEfectivo(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => editarRetiroEfectivo(id, true));
        return;
    }
    const retiro = retirosEfectivo.find(item => item.id === id);
    if (!retiro) return;
    retiroEfectivoEnEdicion = retiro;
    inputMontoRetiroEfectivo.value = retiro.monto;
    inputDescripcionRetiroEfectivo.value = retiro.descripcion || '';
    fechaRetiroEfectivoActual = retiro.fechaHora;
    inputFechaHoraRetiroEfectivo.value = retiro.fechaHora;
    btnGuardarRetiroEfectivo.innerHTML = '<i class="fa-solid fa-check"></i> Guardar cambios';
    inputMontoRetiroEfectivo.focus();
}

function eliminarRetiroEfectivo(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarRetiroEfectivo(id, true));
        return;
    }
    const retiro = retirosEfectivo.find(item => item.id === id);
    if (!retiro) return;
    retiroPendienteDeEliminar = { efectivo: true, retiro };
    modalTituloEliminacion.textContent = '¿Eliminar este retiro de efectivo?';
    modalMensajeEliminacion.textContent = 'Elige si deseas devolver el monto al efectivo disponible.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

btnCerrarRetiroEfectivo.addEventListener('click', cerrarModalRetiroEfectivo);
btnCancelarRetiroEfectivo.addEventListener('click', cerrarModalRetiroEfectivo);
modalRetiroEfectivo.addEventListener('click', event => {
    if (event.target === modalRetiroEfectivo) cerrarModalRetiroEfectivo();
});
btnGuardarRetiroEfectivo.addEventListener('click', guardarRetiroEfectivo);
btnVerHistorialEfectivo.addEventListener('click', () => abrirHistorialRetirosEfectivo());
if (btnVerHistorialTarjetas) btnVerHistorialTarjetas.addEventListener('click', () => abrirHistorialRetirosTarjetas());
btnCerrarHistorialRetirosTarjetas.addEventListener('click', cerrarHistorialRetirosTarjetas);
modalHistorialRetirosTarjetas.addEventListener('click', event => {
    if (event.target === modalHistorialRetirosTarjetas) cerrarHistorialRetirosTarjetas();
});
btnCerrarConfirmarRetiroEfectivo.addEventListener('click', cerrarConfirmacionRetiroEfectivo);
btnCancelarConfirmarRetiro.addEventListener('click', cerrarConfirmacionRetiroEfectivo);
btnConfirmarRetiroEfectivo.addEventListener('click', guardarRetiroEfectivo);
modalConfirmarRetiroEfectivo.addEventListener('click', event => {
    if (event.target === modalConfirmarRetiroEfectivo) cerrarConfirmacionRetiroEfectivo();
});
historialRetirosEfectivo.addEventListener('click', event => {
    const editar = event.target.closest('[data-retiro-efectivo-editar]');
    const eliminar = event.target.closest('[data-retiro-efectivo-eliminar]');
    if (editar) editarRetiroEfectivo(editar.dataset.retiroEfectivoEditar);
    if (eliminar) eliminarRetiroEfectivo(eliminar.dataset.retiroEfectivoEliminar);
});

listaHistorialRetirosCompleto.addEventListener('click', event => {
    const editar = event.target.closest('[data-retiro-efectivo-editar]');
    const eliminar = event.target.closest('[data-retiro-efectivo-eliminar]');
    if (editar) {
        cerrarHistorialRetiros();
        abrirModalRetiroEfectivo();
        editarRetiroEfectivo(editar.dataset.retiroEfectivoEditar);
    }
    if (eliminar) {
        cerrarHistorialRetiros();
        eliminarRetiroEfectivo(eliminar.dataset.retiroEfectivoEliminar);
    }
});

listaHistorialRetirosTarjetas.addEventListener('click', event => {
    const editar = event.target.closest('[data-retiro-tarjeta-editar]');
    const eliminar = event.target.closest('[data-retiro-tarjeta-eliminar]');
    if (editar) editarRetiroTarjetaDesdeHistorial(editar.dataset.retiroTarjetaEditar);
    if (eliminar) eliminarRetiroTarjetaDesdeHistorial(eliminar.dataset.retiroTarjetaEliminar);
});

btnVerHistorialGastos.addEventListener('click', () => abrirHistorialGastos());
btnCerrarHistorialGastos.addEventListener('click', cerrarHistorialGastos);
btnVerMasHistorialGastos.addEventListener('click', () => {
    const mostrarTodo = btnVerMasHistorialGastos.dataset.expandido !== 'true';
    listaHistorialGastos.querySelectorAll('.historial-gasto-fila').forEach((fila, indice) => {
        if (indice >= 3) fila.hidden = !mostrarTodo;
    });
    btnVerMasHistorialGastos.dataset.expandido = String(mostrarTodo);
    btnVerMasHistorialGastos.textContent = mostrarTodo ? 'Ver menos' : 'Ver más';
});
btnVerHistorialGastosCasa.addEventListener('click', () => abrirHistorialGastosCasa());
btnCerrarHistorialGastosCasa.addEventListener('click', cerrarHistorialGastosCasa);
btnVerMasHistorialGastosCasa.addEventListener('click', () => {
    const mostrarTodo = btnVerMasHistorialGastosCasa.dataset.expandido !== 'true';
    listaHistorialGastosCasa.querySelectorAll('.historial-gasto-fila').forEach((fila, indice) => {
        if (indice >= 3) fila.hidden = !mostrarTodo;
    });
    btnVerMasHistorialGastosCasa.dataset.expandido = String(mostrarTodo);
    btnVerMasHistorialGastosCasa.textContent = mostrarTodo ? 'Ver menos' : 'Ver más';
});
modalHistorialGastos.addEventListener('click', event => {
    if (event.target === modalHistorialGastos) cerrarHistorialGastos();
});
listaHistorialGastos.addEventListener('click', event => {
    const editar = event.target.closest('[data-gasto-editar]');
    const eliminar = event.target.closest('[data-gasto-eliminar]');
    if (editar) editarGastoMio(editar.dataset.gastoEditar);
    if (eliminar) eliminarGastoMio(eliminar.dataset.gastoEliminar);
});

modalHistorialGastosCasa.addEventListener('click', event => {
    if (event.target === modalHistorialGastosCasa) cerrarHistorialGastosCasa();
});
listaHistorialGastosCasa.addEventListener('click', event => {
    const editar = event.target.closest('[data-gasto-editar]');
    const eliminar = event.target.closest('[data-gasto-eliminar]');
    if (editar) editarGastoMio(editar.dataset.gastoEditar, listaHistorialGastosCasa);
    if (eliminar) eliminarGastoMio(eliminar.dataset.gastoEliminar);
});

resumenHistorialGastosCasa.addEventListener('click', event => {
    const editar = event.target.closest('[data-gasto-editar]');
    const eliminar = event.target.closest('[data-gasto-eliminar]');
    if (editar) editarGastoMio(editar.dataset.gastoEditar, resumenHistorialGastosCasa);
    if (eliminar) eliminarGastoMio(eliminar.dataset.gastoEliminar);
});

resumenHistorialGastos.addEventListener('click', event => {
    const editar = event.target.closest('[data-gasto-editar]');
    const eliminar = event.target.closest('[data-gasto-eliminar]');
    if (editar) editarGastoMio(editar.dataset.gastoEditar, resumenHistorialGastos);
    if (eliminar) eliminarGastoMio(eliminar.dataset.gastoEliminar);
});

listaOtrosMovimientos.addEventListener('click', event => {
    const editarRegistro = event.target.closest('.btn-editar-otro-registro');
    const eliminarRegistroOtro = event.target.closest('.btn-eliminar-otro-registro');
    const editarGasto = event.target.closest('[data-gasto-editar]');
    const eliminarGasto = event.target.closest('[data-gasto-eliminar]');
    const editarEfectivo = event.target.closest('[data-retiro-efectivo-editar]');
    const eliminarEfectivo = event.target.closest('[data-retiro-efectivo-eliminar]');
    const editarTarjeta = event.target.closest('[data-retiro-tarjeta-editar]');
    const eliminarTarjeta = event.target.closest('[data-retiro-tarjeta-eliminar]');
    if (editarRegistro) {
        const item = [...registros, ...gananciasSemanales].find(registro => registro.id === editarRegistro.closest('[data-registro-id]')?.dataset.registroId);
        if (item) {
            cerrarHistorialRegistros();
            if (item.tipo === 'ganancia_semanal') editarGananciaSemanal(item.id);
            else cargarParaEditar(item.id);
        }
    }
    if (eliminarRegistroOtro) {
        const id = eliminarRegistroOtro.closest('[data-registro-id]')?.dataset.registroId;
        if (id) {
            cerrarHistorialRegistros();
            eliminarRegistro(id);
        }
    }
    if (editarGasto) editarGastoMio(editarGasto.dataset.gastoEditar, listaOtrosMovimientos);
    if (eliminarGasto) eliminarGastoMio(eliminarGasto.dataset.gastoEliminar);
    if (editarEfectivo) { cerrarHistorialRegistros(); abrirModalRetiroEfectivo(); editarRetiroEfectivo(editarEfectivo.dataset.retiroEfectivoEditar); }
    if (eliminarEfectivo) { cerrarHistorialRegistros(); eliminarRetiroEfectivo(eliminarEfectivo.dataset.retiroEfectivoEliminar); }
    if (editarTarjeta) editarRetiroTarjetaDesdeHistorial(editarTarjeta.dataset.retiroTarjetaEditar);
    if (eliminarTarjeta) eliminarRetiroTarjetaDesdeHistorial(eliminarTarjeta.dataset.retiroTarjetaEliminar);
});

listaHistorialGrupo.addEventListener('click', event => {
    const editarRegistro = event.target.closest('.btn-editar-otro-registro');
    const eliminarRegistroOtro = event.target.closest('.btn-eliminar-otro-registro');
    const editarGasto = event.target.closest('[data-gasto-editar]');
    const eliminarGasto = event.target.closest('[data-gasto-eliminar]');
    const editarEfectivo = event.target.closest('[data-retiro-efectivo-editar]');
    const eliminarEfectivo = event.target.closest('[data-retiro-efectivo-eliminar]');
    const editarTarjeta = event.target.closest('[data-retiro-tarjeta-editar]');
    const eliminarTarjeta = event.target.closest('[data-retiro-tarjeta-eliminar]');
    if (editarRegistro) {
        const id = editarRegistro.closest('[data-registro-id]')?.dataset.registroId;
        const item = [...registros, ...gananciasSemanales].find(registro => registro.id === id);
        if (item) { cerrarHistorialGrupo(); item.tipo === 'ganancia_semanal' ? editarGananciaSemanal(item.id) : cargarParaEditar(item.id); }
    }
    if (eliminarRegistroOtro) {
        const id = eliminarRegistroOtro.closest('[data-registro-id]')?.dataset.registroId;
        if (id) { cerrarHistorialGrupo(); eliminarRegistro(id); }
    }
    if (editarGasto) editarGastoMio(editarGasto.dataset.gastoEditar, listaHistorialGrupo);
    if (eliminarGasto) eliminarGastoMio(eliminarGasto.dataset.gastoEliminar);
    if (editarEfectivo) { cerrarHistorialGrupo(); abrirModalRetiroEfectivo(); editarRetiroEfectivo(editarEfectivo.dataset.retiroEfectivoEditar); }
    if (eliminarEfectivo) { cerrarHistorialGrupo(); eliminarRetiroEfectivo(eliminarEfectivo.dataset.retiroEfectivoEliminar); }
    if (editarTarjeta) { cerrarHistorialGrupo(); editarRetiroTarjetaDesdeHistorial(editarTarjeta.dataset.retiroTarjetaEditar); }
    if (eliminarTarjeta) { cerrarHistorialGrupo(); eliminarRetiroTarjetaDesdeHistorial(eliminarTarjeta.dataset.retiroTarjetaEliminar); }
});

function obtenerTotalAbonado(deuda) {
    return (deuda.abonos || []).reduce((total, abono) => total + (Number(abono.monto) || 0), 0);
}

function obtenerSaldoDeuda(deuda) {
    return Math.max(0, Number(deuda.monto || 0) - obtenerTotalAbonado(deuda));
}

function obtenerPagosPorTarjeta(deuda) {
    const pagos = {};
    if (Array.isArray(deuda.abonos) && deuda.abonos.length > 0) {
        deuda.abonos.forEach(abono => {
            if (abono.metodo && abono.metodo !== 'efectivo' && abono.metodo !== 'sin_asignar') {
                pagos[abono.metodo] = (pagos[abono.metodo] || 0) + (Number(abono.monto) || 0) + (Number(abono.comision) || 0);
            }
        });
    } else if (deuda.origenTarjetaId) {
        pagos[deuda.origenTarjetaId] = (Number(deuda.monto) || 0) + (Number(deuda.comisionTarjeta) || 0);
    }
    return pagos;
}

function renderAbonosDeuda(deuda, limite = 3, contenedor = listaAbonosDeuda) {
    const abonos = [...(deuda.abonos || [])].sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
    const abonosVisibles = limite ? abonos.slice(0, limite) : abonos;
    contenedor.innerHTML = abonos.length === 0
        ? '<p class="historial-vacio">Todavía no hay abonos registrados.</p>'
        : abonosVisibles.map(abono => `
            <div class="abono-item">
                    <div><strong>$${Number(abono.monto).toFixed(2)} ${etiquetaModificacion(abono)}</strong><span>${escaparHtml(abono.descripcion || 'Abono')}${Number(abono.comision) > 0 ? ` · Comisión: $${Number(abono.comision).toFixed(2)}` : ''} · ${new Date(abono.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span></div>
                <div class="abono-item-final"><span class="abono-metodo">${abono.metodoNombre || 'Sin asignar'}</span><div class="abono-acciones"><button type="button" class="btn-abono-metodo" data-deuda-id="${deuda.id}" data-abono-id="${abono.id}" title="Cambiar método de pago"><i class="fa-solid fa-wallet"></i></button><button type="button" class="btn-abono-editar" data-deuda-id="${deuda.id}" data-abono-id="${abono.id}" title="Editar abono"><i class="fa-solid fa-pen"></i></button><button type="button" class="btn-abono-eliminar" data-deuda-id="${deuda.id}" data-abono-id="${abono.id}" title="Eliminar abono"><i class="fa-solid fa-xmark"></i></button></div></div>
            </div>`).join('');
}

function actualizarResumenAbono(deuda) {
    abonoTotalDeuda.textContent = `$${Number(deuda.monto).toFixed(2)}`;
    abonoTotalPagado.textContent = `$${obtenerTotalAbonado(deuda).toFixed(2)}`;
    abonoTotalFalta.textContent = `$${obtenerSaldoDeuda(deuda).toFixed(2)}`;
}

function abrirModalAbonoDeuda(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirModalAbonoDeuda(id, true));
        return;
    }
    const deuda = registros.find(registro => registro.id === id && registro.tipo === 'deuda');
    if (!deuda || obtenerSaldoDeuda(deuda) <= 0.009) return;
    deuda.abonos = Array.isArray(deuda.abonos) ? deuda.abonos : [];
    deudaEnAbono = deuda;
    deudaHistorialAbonos = deuda;
    abonoEnEdicion = null;
    inputMontoAbono.value = '';
    inputDescripcionAbono.value = '';
    inputComisionAbono.value = '';
    mensajeAbonoInvalido.hidden = true;
    btnContinuarAbonoDeuda.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Elegir forma de pago';
    actualizarResumenAbono(deuda);
    renderAbonosDeuda(deuda);
    modalAbonoDeuda.hidden = false;
    modalAbonoDeuda.style.display = 'flex';
    inputMontoAbono.focus();
}

function cerrarModalAbonoDeuda(reiniciar = true) {
    modalAbonoDeuda.hidden = true;
    modalAbonoDeuda.style.display = 'none';
    inputComisionAbono.value = '';
    if (reiniciar) {
        deudaEnAbono = null;
        montoAbonoPendiente = 0;
        abonoEnEdicion = null;
    }
}

async function continuarAbonoDeuda() {
    if (!deudaEnAbono) return;
    const monto = Number(inputMontoAbono.value);
    const saldo = obtenerSaldoDeuda(deudaEnAbono) + (abonoEnEdicion ? Number(abonoEnEdicion.monto) : 0);
    if (!Number.isFinite(monto) || monto <= 0 || monto > saldo) {
        mensajeAbonoInvalido.textContent = monto > saldo
            ? `El abono no puede superar el saldo pendiente de $${saldo.toFixed(2)}.`
            : 'Ingresa un monto de abono válido.';
        mensajeAbonoInvalido.hidden = false;
        inputMontoAbono.focus();
        return;
    }
    if (abonoEnEdicion) {
        const comision = Number(inputComisionAbono.value) || 0;
        if (!Number.isFinite(comision) || comision < 0) {
            mensajeAbonoInvalido.textContent = 'Ingresa una comisión válida.';
            mensajeAbonoInvalido.hidden = false;
            return;
        }
        if (!deudaEnAbono.fijadoContable && !ajustarSaldoTarjetaPorAbono(abonoEnEdicion, monto, abonoEnEdicion.metodo, comision)) {
            mensajeAbonoInvalido.textContent = 'La tarjeta seleccionada no tiene saldo suficiente para este abono.';
            mensajeAbonoInvalido.hidden = false;
            return;
        }
        abonoEnEdicion.monto = monto;
        abonoEnEdicion.comision = abonoEnEdicion.metodo && abonoEnEdicion.metodo !== 'efectivo' ? comision : 0;
        abonoEnEdicion.descripcion = inputDescripcionAbono.value.trim() || 'Abono';
        actualizarEstadoEdicionRegistro(abonoEnEdicion, abonoEnEdicion.metodo);
        deudaEnAbono.estado = obtenerSaldoDeuda(deudaEnAbono) <= 0.009 ? 'pagado' : 'pendiente';
        await guardarRegistroEnSupabase(deudaEnAbono);
        await guardarTarjetas();
        guardarYActualizar();
        cerrarModalAbonoDeuda();
        return;
    }
    montoAbonoPendiente = monto;
    const descripcionAbonoPendiente = inputDescripcionAbono.value.trim() || 'Abono';
    deudaEnAbono.comisionAbonoPendiente = Number(inputComisionAbono.value) || 0;
    modoAbonoDeuda = true;
    registroPendienteDeGuardar = deudaEnAbono;
    deudaEnAbono.descripcionAbonoPendiente = descripcionAbonoPendiente;
    cerrarModalAbonoDeuda(false);
    mostrarModalSeleccionarTarjeta();
}

function abrirHistorialAbonos(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialAbonos(true));
        return;
    }
    if (!deudaHistorialAbonos) return;
    renderAbonosDeuda(deudaHistorialAbonos, 0, listaHistorialAbonosCompleto);
    modalHistorialAbonos.hidden = false;
    modalHistorialAbonos.style.display = 'flex';
}

function cerrarHistorialAbonos() {
    modalHistorialAbonos.hidden = true;
    modalHistorialAbonos.style.display = 'none';
}

function editarAbonoDeuda(deudaId, abonoId, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => editarAbonoDeuda(deudaId, abonoId, true));
        return;
    }
    const deuda = registros.find(registro => registro.id === deudaId);
    const abono = deuda?.abonos?.find(item => item.id === abonoId);
    if (!deuda || !abono) return;
    deudaEnAbono = deuda;
    abonoEnEdicion = abono;
    inputMontoAbono.value = abono.monto;
    inputComisionAbono.value = Number(abono.comision) || 0;
    inputDescripcionAbono.value = abono.descripcion || '';
    mensajeAbonoInvalido.hidden = true;
    actualizarResumenAbono(deuda);
    renderAbonosDeuda(deuda);
    btnContinuarAbonoDeuda.innerHTML = '<i class="fa-solid fa-check"></i> Guardar cambios';
    modalAbonoDeuda.hidden = false;
    modalAbonoDeuda.style.display = 'flex';
    inputMontoAbono.focus();
}

function cambiarMetodoAbono(deudaId, abonoId) {
    const deuda = registros.find(registro => registro.id === deudaId);
    const abono = deuda?.abonos?.find(item => item.id === abonoId);
    if (!deuda || !abono) return;
    abonoEnCambioMetodo = abono;
    modoCambioMetodoAbono = true;
    registroPendienteDeGuardar = deuda;
    mostrarModalSeleccionarTarjeta();
}

function ajustarSaldoTarjetaPorAbono(abono, montoNuevo, metodoNuevo = abono.metodo, comisionNueva = Number(abono.comision) || 0) {
    const montoAnterior = Number(abono.monto) || 0;
    const comisionAnterior = Number(abono.comision) || 0;
    const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === abono.metodo);
    const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === metodoNuevo);

    if (tarjetaNueva && tarjetaNueva.id !== (tarjetaAnterior && tarjetaAnterior.id) && tarjetaNueva.monto < montoNuevo + comisionNueva) {
        return false;
    }
    if (tarjetaAnterior) tarjetaAnterior.monto += montoAnterior + comisionAnterior;
    if (tarjetaNueva) tarjetaNueva.monto -= montoNuevo + comisionNueva;
    return true;
}

async function eliminarAbonoDeuda(deudaId, abonoId, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarAbonoDeuda(deudaId, abonoId, true));
        return;
    }
    const deuda = registros.find(registro => registro.id === deudaId);
    if (!deuda || !Array.isArray(deuda.abonos)) return;
    if (!window.confirm('¿Eliminar este abono? El saldo pendiente volverá a aumentar.')) return;
    const abono = deuda.abonos.find(item => item.id === abonoId);
    if (!abono) return;
    if (!deuda.fijadoContable) {
        const tarjeta = tarjetas.find(item => item.id === abono.metodo);
        if (tarjeta) tarjeta.monto += (Number(abono.monto) || 0) + (Number(abono.comision) || 0);
    }
    deuda.abonos = deuda.abonos.filter(item => item.id !== abonoId);
    deuda.estado = obtenerSaldoDeuda(deuda) <= 0.009 ? 'pagado' : 'pendiente';
    await guardarRegistroEnSupabase(deuda);
    await guardarTarjetas();
    guardarYActualizar();
    if (deudaEnAbono?.id === deuda.id) {
        actualizarResumenAbono(deuda);
        renderAbonosDeuda(deuda);
    }
    if (deudaHistorialAbonos?.id === deuda.id) renderAbonosDeuda(deuda, 0, listaHistorialAbonosCompleto);
}

btnCerrarAbonoDeuda.addEventListener('click', cerrarModalAbonoDeuda);
btnCancelarAbonoDeuda.addEventListener('click', cerrarModalAbonoDeuda);
btnContinuarAbonoDeuda.addEventListener('click', continuarAbonoDeuda);
btnVerHistorialAbonos.addEventListener('click', () => abrirHistorialAbonos());
btnCerrarHistorialAbonos.addEventListener('click', cerrarHistorialAbonos);
listaAbonosDeuda.addEventListener('click', event => {
    const editar = event.target.closest('[data-abono-id]');
    if (editar && event.target.closest('.btn-abono-editar')) editarAbonoDeuda(editar.dataset.deudaId, editar.dataset.abonoId);
    if (editar && event.target.closest('.btn-abono-metodo')) cambiarMetodoAbono(editar.dataset.deudaId, editar.dataset.abonoId);
    if (editar && event.target.closest('.btn-abono-eliminar')) eliminarAbonoDeuda(editar.dataset.deudaId, editar.dataset.abonoId);
});
listaHistorialAbonosCompleto.addEventListener('click', event => {
    const accion = event.target.closest('[data-abono-id]');
    if (!accion) return;
    if (event.target.closest('.btn-abono-editar')) editarAbonoDeuda(accion.dataset.deudaId, accion.dataset.abonoId);
    if (event.target.closest('.btn-abono-metodo')) cambiarMetodoAbono(accion.dataset.deudaId, accion.dataset.abonoId);
    if (event.target.closest('.btn-abono-eliminar')) eliminarAbonoDeuda(accion.dataset.deudaId, accion.dataset.abonoId);
});
modalAbonoDeuda.addEventListener('click', event => {
    if (event.target === modalAbonoDeuda) cerrarModalAbonoDeuda();
});

// Funciones para el modal de seleccionar tarjeta al guardar cobro
function mostrarModalSeleccionarTarjeta() {
    mensajeSaldoInsuficiente.hidden = true;
    inputComisionTarjeta.value = registroPendienteDeGuardar?.tipo === 'cobrado'
        ? comisionCobroInput.value
        : deudaEnAbono?.comisionAbonoPendiente || '';
    opcionesTarjetas.innerHTML = '';
    const esDineroPrestado = registroPendienteDeGuardar?.tipo === 'prestado';
    const esDineroRecibido = registroPendienteDeGuardar?.tipo === 'recibido';
    const esDeuda = registroPendienteDeGuardar?.tipo === 'deuda';
    const esCobroRecibido = esDineroRecibido && modoCobrarRecibido;
    const esAbonoDeuda = esDeuda && modoAbonoDeuda;
    const tituloModal = modalSeleccionarTarjeta.querySelector('.modal-header h2');
    const textoModal = modalSeleccionarTarjeta.querySelector('.modal-body p');
    tituloModal.innerHTML = esAbonoDeuda
        ? '<i class="fa-solid fa-coins"></i> ¿De dónde pagarás este abono?'
        : esCobroRecibido
        ? '<i class="fa-solid fa-hand-holding-dollar"></i> ¿A dónde mandarás el dinero cobrado?'
        : esDeuda
        ? '<i class="fa-solid fa-file-invoice-dollar"></i> ¿Cómo pagarás esta deuda?'
        : esDineroPrestado
        ? '<i class="fa-solid fa-money-bill-transfer"></i> ¿De dónde sale este dinero?'
        : esDineroRecibido
        ? '<i class="fa-solid fa-hand-holding-hand"></i> ¿Dónde recibiste este dinero?'
        : '<i class="fa-solid fa-circle-question"></i> ¿A dónde va este dinero?';
    textoModal.textContent = esAbonoDeuda
        ? 'Elige efectivo, una tarjeta o deja este abono sin asignar.'
        : esCobroRecibido
        ? 'Selecciona si el dinero irá a efectivo, una tarjeta o quedará sin asignar.'
        : esDeuda
        ? 'Elige efectivo, una tarjeta o deja el pago sin asignar.'
        : esDineroPrestado
        ? 'Selecciona la tarjeta de donde saldrá el dinero o elige efectivo.'
        : esDineroRecibido
        ? 'Elige efectivo, una tarjeta o deja el dinero sin asignar.'
        : 'Selecciona a qué tarjeta o cuenta quieres enviar este monto';

    if (esDeuda || esDineroRecibido) {
        const opcionSinAsignar = document.createElement('div');
        opcionSinAsignar.className = 'opcion-tarjeta';
        opcionSinAsignar.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <i class="fa-solid fa-minus-circle" style="font-size: 1.5rem; color: #64748b;"></i>
                <span>Sin asignar</span>
            </div>
            <i class="fa-solid fa-circle-check" style="opacity: 0;"></i>
        `;
        opcionSinAsignar.addEventListener('click', function() {
            seleccionarOpcionTarjeta('sin_asignar', this);
        });
        opcionesTarjetas.appendChild(opcionSinAsignar);
    }
    
    // Agregar opción de efectivo
    const opcionEfectivo = document.createElement('div');
    opcionEfectivo.className = 'opcion-tarjeta';
    opcionEfectivo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <i class="fa-solid fa-money-bill-wave" style="font-size: 1.5rem; color: var(--amber);"></i>
            <span>Dinero en Efectivo</span>
        </div>
        <i class="fa-solid fa-circle-check" style="opacity: 0;"></i>
    `;
    opcionEfectivo.addEventListener('click', function() {
        seleccionarOpcionTarjeta('efectivo', this);
    });
    opcionesTarjetas.appendChild(opcionEfectivo);
    
    // Agregar opciones de tarjetas
    tarjetas.forEach(tarjeta => {
        const opcion = document.createElement('div');
        opcion.className = 'opcion-tarjeta';
        opcion.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <i class="fa-solid fa-credit-card"></i>
                <div>
                    <div style="font-weight: 600; color: var(--primary-color);">${tarjeta.nombre}</div>
                    <div style="font-size: 0.85rem; color: #94a3b8;">$${tarjeta.monto.toFixed(2)}</div>
                </div>
            </div>
            <i class="fa-solid fa-circle-check" style="opacity: 0;"></i>
        `;
        opcion.addEventListener('click', function() {
            seleccionarOpcionTarjeta(tarjeta.id, this);
        });
        opcionesTarjetas.appendChild(opcion);
    });
    
    modalSeleccionarTarjeta.style.display = 'flex';
}

function seleccionarOpcionTarjeta(tarjetaId, elemento) {
    // Remover active de todos
    document.querySelectorAll('.opcion-tarjeta').forEach(el => el.classList.remove('activa'));
    
    // Agregar active al seleccionado
    elemento.classList.add('activa');
    elemento.querySelector('i:last-child').style.opacity = '1';
    
    // Guardar la tarjeta seleccionada
    tarjetaSeleccionadaPendiente = tarjetaId;
}

function cerrarModalSeleccionarTarjeta() {
    if (registroPendienteDePago) {
        registroPendienteDePago.registro.estado = registroPendienteDePago.estado;
        if (registroPendienteDePago.tipo !== undefined) {
            registroPendienteDePago.registro.tipo = registroPendienteDePago.tipo;
        }
        if (registroPendienteDePago.fechaHora !== undefined) {
            registroPendienteDePago.registro.fechaHora = registroPendienteDePago.fechaHora;
        }
        registroPendienteDePago = null;
        guardarYActualizar();
    }
    modalSeleccionarTarjeta.style.display = 'none';
    mensajeSaldoInsuficiente.hidden = true;
    registroPendienteDeGuardar = null;
    tarjetaSeleccionadaPendiente = null;
    deudaEnReasignacion = null;
    modoCobrarRecibido = false;
    modoAbonoDeuda = false;
    modoCambioMetodoAbono = false;
    abonoEnCambioMetodo = null;
    deudaEnAbono = null;
    montoAbonoPendiente = 0;
}

async function confirmarGuardarCobro() {
    if (!registroPendienteDeGuardar) return;
    
    const nuevoRegistro = registroPendienteDeGuardar;
    const esDineroPrestado = nuevoRegistro.tipo === 'prestado';
    const esDineroRecibido = nuevoRegistro.tipo === 'recibido';
    const esCobroRecibido = esDineroRecibido && modoCobrarRecibido;
    const esDeuda = nuevoRegistro.tipo === 'deuda';
    const deudaFijada = esDeuda && nuevoRegistro.fijadoContable;
    const esAbonoDeuda = esDeuda && modoAbonoDeuda;
    const esCambioMetodoAbono = esDeuda && modoCambioMetodoAbono && abonoEnCambioMetodo;
    const comision = Number(inputComisionTarjeta.value) || 0;
    const comisionAplicable = tarjetaSeleccionadaPendiente && tarjetaSeleccionadaPendiente !== 'efectivo' && tarjetaSeleccionadaPendiente !== 'sin_asignar' ? comision : 0;
    const saldoAntesDePago = esDeuda ? obtenerSaldoDeuda(nuevoRegistro) : Number(nuevoRegistro.monto);
    const montoOperacion = esAbonoDeuda
        ? montoAbonoPendiente
        : deudaEnReasignacion?.montoPagado || saldoAntesDePago;
    if ((esDineroPrestado || esDineroRecibido || esDeuda) && !tarjetaSeleccionadaPendiente) {
        alert('Selecciona la tarjeta de donde saldrá el dinero o elige efectivo.');
        return;
    }
    if (esDeuda && !tarjetaSeleccionadaPendiente) {
        alert('Selecciona efectivo, una tarjeta o "Sin asignar".');
        return;
    }
    const esPagoSinAsignar = esDeuda && tarjetaSeleccionadaPendiente === 'sin_asignar';
    if (esDeuda && !esAbonoDeuda && !esPagoSinAsignar) {
        nuevoRegistro.estado = 'pagado';
    }
    const tarjetaDestino = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionadaPendiente);
    if (esCambioMetodoAbono) {
        const montoCambio = Number(abonoEnCambioMetodo.monto) || 0;
        const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === abonoEnCambioMetodo.metodo);
        if (tarjetaDestino && tarjetaDestino.id !== (tarjetaAnterior && tarjetaAnterior.id) && tarjetaDestino.monto < montoCambio) {
            detalleSaldoInsuficiente.textContent = `La tarjeta tiene $${tarjetaDestino.monto.toFixed(2)} disponibles y necesitas $${montoCambio.toFixed(2)} para este abono.`;
            mensajeSaldoInsuficiente.hidden = false;
            return;
        }
        if (tarjetaAnterior && tarjetaAnterior.id !== (tarjetaDestino && tarjetaDestino.id)) tarjetaAnterior.monto += montoCambio;
        if (tarjetaDestino && tarjetaDestino.id !== (tarjetaAnterior && tarjetaAnterior.id)) tarjetaDestino.monto -= montoCambio;
        abonoEnCambioMetodo.metodo = tarjetaSeleccionadaPendiente;
        actualizarEstadoEdicionRegistro(abonoEnCambioMetodo, tarjetaSeleccionadaPendiente);
        abonoEnCambioMetodo.metodoNombre = tarjetaSeleccionadaPendiente === 'efectivo'
            ? 'Efectivo'
            : tarjetaDestino?.nombre || (tarjetaSeleccionadaPendiente === 'sin_asignar' ? 'Sin asignar' : 'Tarjeta');
        await guardarRegistroEnSupabase(nuevoRegistro);
        guardarTarjetas();
        guardarYActualizar();
        cerrarModalSeleccionarTarjeta();
        return;
    }
    if (esAbonoDeuda) {
        nuevoRegistro.abonos = Array.isArray(nuevoRegistro.abonos) ? nuevoRegistro.abonos : [];
        const metodoNombre = tarjetaSeleccionadaPendiente === 'efectivo'
            ? 'Efectivo'
            : tarjetaDestino?.nombre || (tarjetaSeleccionadaPendiente === 'sin_asignar' ? 'Sin asignar' : 'Tarjeta');
        nuevoRegistro.abonos.push({
            id: Date.now().toString(),
            monto: montoOperacion,
            fechaHora: obtenerFechaHoraLocal(),
            metodo: tarjetaSeleccionadaPendiente,
            metodoNombre,
            descripcion: nuevoRegistro.descripcionAbonoPendiente || 'Abono',
            comision: comisionAplicable
        });
        delete nuevoRegistro.descripcionAbonoPendiente;
        delete nuevoRegistro.comisionAbonoPendiente;
        nuevoRegistro.estado = obtenerSaldoDeuda(nuevoRegistro) <= 0.009 ? 'pagado' : 'pendiente';
    } else if (esDeuda && !deudaEnReasignacion && montoOperacion > 0) {
        nuevoRegistro.abonos = Array.isArray(nuevoRegistro.abonos) ? nuevoRegistro.abonos : [];
        nuevoRegistro.abonos.push({
            id: Date.now().toString(),
            monto: montoOperacion,
            fechaHora: obtenerFechaHoraLocal(),
            metodo: tarjetaSeleccionadaPendiente,
            metodoNombre: tarjetaSeleccionadaPendiente === 'efectivo' ? 'Efectivo' : tarjetaDestino?.nombre || (tarjetaSeleccionadaPendiente === 'sin_asignar' ? 'Sin asignar' : 'Tarjeta'),
            comision: comisionAplicable
        });
    } else if (esCobroRecibido) {
        nuevoRegistro.estado = 'pagado';
        nuevoRegistro.origenTarjetaId = null;
        nuevoRegistro.origenTarjetaNombre = '';
        nuevoRegistro.origenEfectivo = false;
        nuevoRegistro.tarjetaDestinoId = tarjetaDestino ? tarjetaDestino.id : null;
        nuevoRegistro.tarjetaDestinoNombre = tarjetaDestino ? tarjetaDestino.nombre : '';
        nuevoRegistro.destinoEfectivo = tarjetaSeleccionadaPendiente === 'efectivo';
        nuevoRegistro.comisionTarjeta = comisionAplicable;
    } else if (tarjetaDestino && (esDineroPrestado || esDineroRecibido || esDeuda)) {
        nuevoRegistro.origenTarjetaId = tarjetaDestino.id;
        nuevoRegistro.origenTarjetaNombre = tarjetaDestino.nombre;
        nuevoRegistro.origenEfectivo = false;
        nuevoRegistro.comisionTarjeta = comisionAplicable;
    } else if (tarjetaDestino) {
        nuevoRegistro.tarjetaDestinoId = tarjetaDestino.id;
        nuevoRegistro.tarjetaDestinoNombre = tarjetaDestino.nombre;
        nuevoRegistro.destinoEfectivo = false;
        nuevoRegistro.comisionTarjeta = comisionAplicable;
    } else if (tarjetaSeleccionadaPendiente === 'efectivo' && (esDineroPrestado || esDineroRecibido || esDeuda)) {
        nuevoRegistro.origenTarjetaId = null;
        nuevoRegistro.origenTarjetaNombre = '';
        nuevoRegistro.origenEfectivo = true;
    } else if ((esDeuda || esDineroRecibido) && tarjetaSeleccionadaPendiente === 'sin_asignar') {
        nuevoRegistro.origenTarjetaId = null;
        nuevoRegistro.origenTarjetaNombre = '';
        nuevoRegistro.origenEfectivo = false;
    } else if (tarjetaSeleccionadaPendiente === 'efectivo') {
        nuevoRegistro.tarjetaDestinoId = null;
        nuevoRegistro.tarjetaDestinoNombre = '';
        nuevoRegistro.destinoEfectivo = true;
    }

    if (!deudaFijada && !deudaEnReasignacion && (esAbonoDeuda || (!esCobroRecibido && (esDineroPrestado || esDeuda))) && tarjetaSeleccionadaPendiente && tarjetaSeleccionadaPendiente !== 'efectivo' && tarjetaSeleccionadaPendiente !== 'sin_asignar') {
        const tarjetaOrigen = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionadaPendiente);
        const saldoRestaurado = deudaEnReasignacion && deudaEnReasignacion.origenTarjetaId === tarjetaSeleccionadaPendiente
            ? montoOperacion
            : 0;
        const saldoDisponible = tarjetaOrigen ? tarjetaOrigen.monto + saldoRestaurado : 0;
        if (!tarjetaOrigen || saldoDisponible < montoOperacion + comisionAplicable) {
            const montoFaltante = Math.max(0, montoOperacion + comisionAplicable - saldoDisponible);
            detalleSaldoInsuficiente.textContent = `Necesitas $${montoOperacion.toFixed(2)}, pero esta opción tiene $${saldoDisponible.toFixed(2)} disponibles. Faltan $${montoFaltante.toFixed(2)}.`;
            mensajeSaldoInsuficiente.hidden = false;
            return;
        }
    }
    
    // Si ya tiene ID, es una actualización (de pendiente a pagado)
    if (nuevoRegistro.id) {
        await guardarRegistroEnSupabase(nuevoRegistro);
    } else {
        // Es un registro nuevo
        const nuevoId = await guardarRegistroEnSupabase(nuevoRegistro);
        if (!nuevoId) {
            cerrarModalSeleccionarTarjeta();
            return;
        }
        nuevoRegistro.id = nuevoId;
        
        if (nuevoRegistro.tipo === 'ganancia_semanal') {
            gananciasSemanales.unshift(nuevoRegistro);
        } else {
            registros.push(nuevoRegistro);
        }
    }
    
    // Al reasignar una deuda se devuelve el pago anterior y se aplica el nuevo.
    if (!deudaFijada && esDeuda && deudaEnReasignacion) {
        const pagosPorTarjeta = obtenerPagosPorTarjeta(nuevoRegistro);
        const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionadaPendiente);
        const saldoDevueltoATarjetaNueva = tarjetaNueva ? pagosPorTarjeta[tarjetaNueva.id] || 0 : 0;
        if (tarjetaNueva && tarjetaNueva.monto + saldoDevueltoATarjetaNueva < montoOperacion) {
            detalleSaldoInsuficiente.textContent = `La tarjeta tiene $${(tarjetaNueva.monto + saldoDevueltoATarjetaNueva).toFixed(2)} disponibles y necesitas $${montoOperacion.toFixed(2)} para este pago.`;
            mensajeSaldoInsuficiente.hidden = false;
            return;
        }
        Object.entries(pagosPorTarjeta).forEach(([tarjetaId, monto]) => {
            const tarjeta = tarjetas.find(item => item.id === tarjetaId);
            if (tarjeta) tarjeta.monto += monto;
        });
        const metodoNombre = tarjetaSeleccionadaPendiente === 'efectivo'
            ? 'Efectivo'
            : tarjetas.find(item => item.id === tarjetaSeleccionadaPendiente)?.nombre || (tarjetaSeleccionadaPendiente === 'sin_asignar' ? 'Sin asignar' : 'Tarjeta');
        if (tarjetaNueva) tarjetaNueva.monto -= montoOperacion;
        nuevoRegistro.abonos = Array.isArray(nuevoRegistro.abonos) ? nuevoRegistro.abonos : [];
        if (nuevoRegistro.abonos.length === 0 && montoOperacion > 0) {
            nuevoRegistro.abonos.push({
                id: Date.now().toString(),
                monto: montoOperacion,
                fechaHora: obtenerFechaHoraLocal(),
                descripcion: 'Pago de deuda',
                metodo: tarjetaSeleccionadaPendiente,
                metodoNombre
            });
        } else {
            nuevoRegistro.abonos = nuevoRegistro.abonos.map(abono => ({
                ...abono,
                metodo: tarjetaSeleccionadaPendiente,
                metodoNombre
            }));
        }
        await guardarRegistroEnSupabase(nuevoRegistro);
        guardarTarjetas();
    // Cobros suman a la tarjeta; el dinero prestado y las deudas salen de la tarjeta.
    } else if (!deudaFijada && tarjetaSeleccionadaPendiente && tarjetaSeleccionadaPendiente !== 'sin_asignar' && (esDineroPrestado || esDeuda || esAbonoDeuda)) {
        const tarjeta = tarjetas.find(t => t.id === tarjetaSeleccionadaPendiente);
        if (tarjeta) {
            tarjeta.monto -= montoOperacion + comisionAplicable;
            guardarTarjetas();
        }
    } else if (!deudaFijada && tarjetaSeleccionadaPendiente && !esDeuda) {
        const tarjeta = tarjetas.find(t => t.id === tarjetaSeleccionadaPendiente);
        if (tarjeta) {
            tarjeta.monto += nuevoRegistro.monto - comisionAplicable;
            guardarTarjetas();
        }
    }
    
    guardarYActualizar();
    resetFormulario();
    registroPendienteDePago = null;
    deudaEnReasignacion = null;
    cerrarModalSeleccionarTarjeta();
}


// Event listeners para tarjetas
btnAgregarTarjeta.addEventListener('click', () => abrirModalAgregarTarjeta());

// Cerrar modal al hacer click fuera
modalAgregarTarjeta.addEventListener('click', function(e) {
    if (e.target === modalAgregarTarjeta) {
        solicitarCancelarTarjeta();
    }
});

modalDetalleTarjeta.addEventListener('click', function(e) {
    if (e.target === modalDetalleTarjeta) {
        cerrarModalDetalleTarjeta();
    }
});

// Permitir enter en los inputs del modal
inputNombreTarjeta.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        inputMontoTarjeta.focus();
    }
});

inputMontoTarjeta.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        guardarNuevaTarjeta();
    }
});

// Cerrar modal de seleccionar tarjeta al hacer click fuera
modalSeleccionarTarjeta.addEventListener('click', function(e) {
    if (e.target === modalSeleccionarTarjeta) {
        cerrarModalSeleccionarTarjeta();
    }
});

// Ajustar los campos obligatorios según el tipo de movimiento.
function actualizarCamposFormulario() {
    const esRetiroEfectivo = tipoInput.value === 'retiro_efectivo';
    const esRetiroTarjeta = tipoInput.value === 'retiro_tarjeta';
    const esGastoMio = tipoInput.value === 'gasto_mio';
    const esGastoCasa = tipoInput.value === 'gasto_casa';
    const esGasto = esGastoMio || esGastoCasa;
    limpiarAvisosSaldoRetiro();
    grupoTipo.hidden = false;
    grupoTarjeta.style.display = tipoInput.value === 'cobrado' || esRetiroTarjeta ? 'block' : 'none';
    grupoTarjeta.hidden = tipoInput.value !== 'cobrado' && !esRetiroTarjeta;
    grupoTarjeta.querySelector('label').textContent = esRetiroTarjeta
        ? '¿De qué tarjeta quieres retirar?'
        : 'Enviar a Tarjeta (para cobros)';
    grupoComisionRetiroTarjeta.hidden = !esRetiroTarjeta;
    grupoComisionRetiroTarjeta.style.display = esRetiroTarjeta ? '' : 'none';
    grupoCliente.hidden = esRetiroEfectivo || esRetiroTarjeta;
    grupoCliente.style.display = esRetiroEfectivo || esRetiroTarjeta || esGasto ? 'none' : '';
    grupoFecha.hidden = false;
    grupoFecha.style.display = '';
    clienteInput.required = !esRetiroEfectivo && !esRetiroTarjeta && !esGasto;
    fechaHoraInput.required = true;
    descripcionInput.required = esRetiroEfectivo || esGastoMio;
    descripcionInput.closest('.form-group').hidden = esRetiroTarjeta;
    descripcionInput.closest('.form-group').style.display = esRetiroTarjeta ? 'none' : '';
    tarjetaDestinoSelect.required = esRetiroTarjeta;
    grupoFuenteGasto.hidden = !esGasto;
    grupoFuenteGasto.style.display = esGasto ? '' : 'none';
    fuenteGastoSelect.required = esGasto;
    grupoComisionGasto.hidden = !esGasto;
    grupoComisionGasto.style.display = esGasto ? '' : 'none';
    comisionGastoInput.required = false;
    const esCobro = tipoInput.value === 'cobrado';
    grupoComisionCobro.hidden = !esCobro;
    grupoComisionCobro.style.display = esCobro ? '' : 'none';
    comisionCobroInput.required = false;
    saldoRetiroForm.hidden = !esRetiroEfectivo;
    saldoRetiroFormValor.textContent = `$${calcularEfectivoDisponible().toFixed(2)}`;
    actualizarFuenteGasto();
    actualizarSaldoEfectivoEnDestino();
    actualizarDestinoParaRetiroTarjeta();
}

tipoInput.addEventListener('change', actualizarCamposFormulario);
actualizarCamposFormulario();

// Funciones para Ganancias Semanales
function abrirModalGanancia() {
    gananciaEnEdicion = null;
    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    document.getElementById('input-fecha-ganancia').value = hoy.toISOString().slice(0, 16);
    document.getElementById('input-monto-ganancia').value = '';
    document.getElementById('input-descripcion-ganancia').value = '';
    document.getElementById('input-estado-ganancia').value = 'pagado';
    
    // Limpiar checkboxes
    document.querySelectorAll('.checkbox-dia').forEach(cb => cb.checked = false);
    checkboxEntrelazarDias.checked = false;
    checkboxMultiplesTrabajos.checked = false;
    actualizarSelectorDias();
    actualizarDescripcionesDias();
    
    modalAgregarGanancia.style.display = 'flex';
}

function actualizarSelectorDias() {
    document.querySelectorAll('.checkbox-dia').forEach(cb => {
        cb.disabled = false;
    });
}

checkboxEntrelazarDias.addEventListener('change', function() {
    actualizarSelectorDias();
    actualizarDescripcionesDias();
});

checkboxMultiplesTrabajos.addEventListener('change', actualizarDescripcionesDias);

document.querySelectorAll('.checkbox-dia').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        actualizarSelectorDias();
        actualizarDescripcionesDias();
    });
});

function actualizarDescripcionesDias() {
    const diasSeleccionados = Array.from(document.querySelectorAll('.checkbox-dia:checked'));
    const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const mostrarUnaPorDia = (diasSeleccionados.length > 1 && !checkboxEntrelazarDias.checked) || checkboxMultiplesTrabajos.checked;

    descripcionesDias.innerHTML = '';
    document.getElementById('input-descripcion-ganancia').closest('.form-group').querySelector('label[for="input-descripcion-ganancia"]').textContent = mostrarUnaPorDia ? 'Descripción general (opcional)' : 'Descripción';
    document.getElementById('input-descripcion-ganancia').style.display = mostrarUnaPorDia ? 'none' : 'block';
    inputMontoGanancia.readOnly = mostrarUnaPorDia;

    if (!mostrarUnaPorDia) return;

    if (diasSeleccionados.length === 0) {
        descripcionesDias.innerHTML = '<p class="form-help">Selecciona al menos un día para agregar las descripciones.</p>';
        return;
    }

    descripcionesDias.innerHTML = diasSeleccionados.map(checkbox => `
        <div class="descripcion-dia-item" data-dia-grupo="${checkbox.value}">
            <label>${nombresDias[checkbox.value]}</label>
            <div class="descripcion-trabajo-lista">
                <div class="descripcion-trabajo-item">
                    <input type="text" class="descripcion-dia-input" data-dia="${checkbox.value}" placeholder="Lugar o trabajo del ${nombresDias[checkbox.value].toLowerCase()}" required>
                    <input type="text" class="precio-dia-input" data-dia="${checkbox.value}" inputmode="decimal" placeholder="Precio 50.50 o 50,50" required>
                    <button type="button" class="btn-eliminar-trabajo-dia" title="Eliminar este trabajo" aria-label="Eliminar este trabajo">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <button type="button" class="btn-agregar-trabajo-dia" data-dia="${checkbox.value}">
                <i class="fa-solid fa-plus"></i> Agregar otro trabajo
            </button>
        </div>
    `).join('');
}

descripcionesDias.addEventListener('click', function(event) {
    const eliminar = event.target.closest('.btn-eliminar-trabajo-dia');
    if (eliminar) {
        const item = eliminar.closest('.descripcion-trabajo-item');
        const lista = item.closest('.descripcion-trabajo-lista');
        if (lista.children.length > 1) {
            item.remove();
            actualizarMontoDesglosado();
        } else {
            item.querySelector('.descripcion-dia-input').value = '';
            item.querySelector('.precio-dia-input').value = '';
            actualizarMontoDesglosado();
        }
        return;
    }

    const boton = event.target.closest('.btn-agregar-trabajo-dia');
    if (!boton) return;

    const grupo = descripcionesDias.querySelector(`[data-dia-grupo="${boton.dataset.dia}"]`);
    const lista = grupo.querySelector('.descripcion-trabajo-lista');
    const input = document.createElement('input');
    input.type = 'text';
    const item = document.createElement('div');
    item.className = 'descripcion-trabajo-item';
    input.className = 'descripcion-dia-input';
    input.dataset.dia = boton.dataset.dia;
    input.placeholder = 'Otro lugar o trabajo';
    input.required = true;
    const precio = document.createElement('input');
    precio.type = 'text';
    precio.className = 'precio-dia-input';
    precio.dataset.dia = boton.dataset.dia;
    precio.inputMode = 'decimal';
    precio.placeholder = 'Precio 50.50 o 50,50';
    precio.required = true;
    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'btn-eliminar-trabajo-dia';
    botonEliminar.title = 'Eliminar este trabajo';
    botonEliminar.setAttribute('aria-label', 'Eliminar este trabajo');
    botonEliminar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    item.append(input, precio, botonEliminar);
    lista.appendChild(item);
    input.focus();
});

descripcionesDias.addEventListener('input', function(event) {
    if (event.target.classList.contains('precio-dia-input')) {
        actualizarMontoDesglosado();
    }
});

function actualizarMontoDesglosado() {
    if (!checkboxMultiplesTrabajos.checked) return;

    const precios = Array.from(document.querySelectorAll('.precio-dia-input'))
        .map(input => convertirMonto(input.value))
        .filter(precio => Number.isFinite(precio));
    inputMontoGanancia.value = precios.reduce((total, precio) => total + precio, 0).toFixed(2);
}

function convertirMonto(valor) {
    const texto = String(valor ?? '').trim().replace(/\s/g, '').replace(',', '.');
    return texto ? Number(texto) : NaN;
}

window.cerrarModalGanancia = function() {
    modalAgregarGanancia.style.display = 'none';
    gananciaEnEdicion = null;
    btnCancelarEdicionGanancia.hidden = true;
    textoGuardarGanancia.textContent = 'Guardar';
    iconoGuardarGanancia.className = 'fa-solid fa-check';
}

window.guardarGananciaSemanal = async function(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.guardarGananciaSemanal(true));
        return;
    }
    const monto = convertirMonto(document.getElementById('input-monto-ganancia').value);
    const descripcion = document.getElementById('input-descripcion-ganancia').value.trim();
    const estado = document.getElementById('input-estado-ganancia').value;
    const fecha = document.getElementById('input-fecha-ganancia').value;
    
    const checkboxes = document.querySelectorAll('.checkbox-dia:checked');
    const dias = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const entrelazarDias = checkboxEntrelazarDias.checked;
    const descripcionesPorDia = {};

    document.querySelectorAll('.descripcion-dia-input').forEach(input => {
        const descripcion = input.value.trim() || 'Ganancia Semanal';
        const precioInput = input.closest('.descripcion-trabajo-item').querySelector('.precio-dia-input');
        const precio = convertirMonto(precioInput.value);
        descripcionesPorDia[input.dataset.dia] = descripcionesPorDia[input.dataset.dia] || [];
        descripcionesPorDia[input.dataset.dia].push({ descripcion, monto: precio });
    });

    if (!Number.isFinite(monto) || monto <= 0) {
        alert('Por favor ingresa un monto válido');
        return;
    }

    if (Object.keys(descripcionesPorDia).length > 0) {
        const precios = Object.values(descripcionesPorDia).flat().map(trabajo => trabajo.monto);
        if (precios.some(precio => !Number.isFinite(precio) || precio < 0)) {
            alert('Ingresa un precio válido para cada trabajo.');
            return;
        }
        const totalDesglosado = precios.reduce((total, precio) => total + precio, 0);
        if (Math.abs(totalDesglosado - monto) > 0.009) {
            alert(`El total de los precios ($${totalDesglosado.toFixed(2)}) debe coincidir con el monto ganado ($${monto.toFixed(2)}).`);
            return;
        }
    }

    if (dias.length === 0) {
        alert('Por favor selecciona al menos un día');
        return;
    }

    if (entrelazarDias && dias.length < 2) {
        alert('Para entrelazar días debes seleccionar al menos 2 días.');
        return;
    }

    if (!fecha) {
        alert('Por favor selecciona una fecha');
        return;
    }

    if (gananciaEnEdicion) {
        const estabaPagada = gananciaEnEdicion.estado === 'pagado';
        const quedaraPagada = estado === 'pagado';
        const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === gananciaEnEdicion.tarjetaDestinoId);

        if (!estabaPagada && quedaraPagada && !gananciaEnEdicion.tarjetaDestinoId && !gananciaEnEdicion.destinoEfectivo) {
            alert('Asigna primero una tarjeta o efectivo para marcar esta ganancia como pagada.');
            return;
        }
        if (estabaPagada && tarjetaAnterior) {
            tarjetaAnterior.monto += quedaraPagada
                ? (Number(gananciaEnEdicion.monto) || 0) - monto
                : Number(gananciaEnEdicion.monto) || 0;
        }
    }

    const nuevaGanancia = {
        id: gananciaEnEdicion ? gananciaEnEdicion.id : undefined,
        tipo: 'ganancia_semanal',
        cliente: 'Ganancia Semanal',
        monto: monto,
        descripcion: descripcion || 'Ganancia Semanal',
        fechaHora: fecha,
        estado: estado,
        dias: dias,
        entrelazarDias: entrelazarDias,
        descripcionesPorDia: descripcionesPorDia,
        tarjetaDestinoId: gananciaEnEdicion ? gananciaEnEdicion.tarjetaDestinoId || null : null,
        tarjetaDestinoNombre: gananciaEnEdicion ? gananciaEnEdicion.tarjetaDestinoNombre || '' : '',
        destinoEfectivo: gananciaEnEdicion ? Boolean(gananciaEnEdicion.destinoEfectivo) : false
    };

    if (gananciaEnEdicion && gananciaEnEdicion.estado === 'pagado' && estado !== 'pagado') {
        nuevaGanancia.tarjetaDestinoId = null;
        nuevaGanancia.tarjetaDestinoNombre = '';
        nuevaGanancia.destinoEfectivo = false;
    }

    if (gananciaEnEdicion) {
        nuevaGanancia.baseEdicionRegistro = gananciaEnEdicion.baseEdicionRegistro;
        actualizarEstadoEdicionRegistro(nuevaGanancia);
    }

    if (gananciaEnEdicion) {
        const indice = gananciasSemanales.findIndex(ganancia => ganancia.id === gananciaEnEdicion.id);
        if (indice !== -1) {
            await guardarRegistroEnSupabase(nuevaGanancia);
            gananciasSemanales[indice] = nuevaGanancia;
            await guardarTarjetas();
            guardarYActualizar();
            cerrarModalGanancia();
        }
        return;
    }

    if (estado === 'pagado') {
        registroPendienteDeGuardar = nuevaGanancia;
        cerrarModalGanancia();
        mostrarModalSeleccionarTarjeta();
    } else {
        const nuevoId = await guardarRegistroEnSupabase(nuevaGanancia);
        if (nuevoId) {
            nuevaGanancia.id = nuevoId;
            gananciasSemanales.unshift(nuevaGanancia);
            localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
            renderGananciasSemanales();
            cerrarModalGanancia();
            actualizarInterfaz();
        }
    }
}

function prepararRegistroDeuda() {
    resetFormulario();
    tipoInput.value = 'deuda';
    clienteInput.focus();
    window.scrollTo({ top: document.querySelector('.form-card').offsetTop, behavior: 'smooth' });
}

function renderGananciasSemanales(mostrarTodos = false, contenedor = tablaGananciasSemanales) {
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    const elementosCalendario = gananciasSemanales.filter(ganancia => !ganancia.eliminadoSinDevolver)
        .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));

    if (elementosCalendario.length === 0) {
        contenedor.innerHTML = `
            <div class="ganancias-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>No hay ganancias semanales registradas</p>
            </div>
        `;
        return;
    }

    const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const elementosVisibles = mostrarTodos ? elementosCalendario : elementosCalendario.slice(0, 3);

    elementosVisibles.forEach(ganancia => {
        const div = document.createElement('div');
        div.className = 'ganancia-item';

        const esMovimiento = ganancia.enCalendario && ganancia.tipo !== 'ganancia_semanal';
        const diaMovimiento = (new Date(ganancia.fechaHora).getDay() + 6) % 7;
        const dias = Array.isArray(ganancia.dias) && ganancia.dias.length > 0 ? ganancia.dias : [diaMovimiento];
        const estado = ganancia.estado || (ganancia.tipo === 'cobrado' ? 'pagado' : 'pendiente');
        const diasBadges = dias.map(d => `<span class="dia-badge">${nombresDias[d]}</span>`).join('');
        const modalidad = ganancia.entrelazarDias ? `<span class="dias-unidos"><i class="fa-solid fa-link"></i> ${ganancia.dias.length} días, 1 precio</span>` : '';
        const tarjetaDestino = ganancia.tarjetaDestinoId
            ? tarjetas.find(tarjeta => tarjeta.id === ganancia.tarjetaDestinoId)
            : null;
        const destinoHtml = ganancia.tipo === 'retiro_efectivo'
            ? '<div class="ganancia-destino retiro-efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Salida de efectivo</strong></span></div>'
            : ganancia.tipo === 'deuda' && ganancia.origenEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Deuda pagada en efectivo</strong></span></div>'
            : ganancia.tipo === 'deuda' && ganancia.origenTarjetaId
            ? `<div class="ganancia-destino"><i class="fa-solid fa-credit-card"></i><span>Deuda pagada con: <strong>${escaparHtml(tarjetas.find(tarjeta => tarjeta.id === ganancia.origenTarjetaId)?.nombre || ganancia.origenTarjetaNombre || 'Tarjeta')}</strong></span></div>`
            : ganancia.tipo === 'deuda' && ganancia.estado === 'pagado'
            ? '<div class="ganancia-destino sin-destino"><i class="fa-solid fa-minus-circle"></i><span>Pago sin asignar</span></div>'
            : ganancia.tipo === 'prestado' && ganancia.origenEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Prestado en efectivo</strong></span></div>'
            : ganancia.tipo === 'prestado' && ganancia.origenTarjetaId
            ? `<div class="ganancia-destino"><i class="fa-solid fa-credit-card"></i><span>Prestado desde: <strong>${escaparHtml(tarjetas.find(tarjeta => tarjeta.id === ganancia.origenTarjetaId)?.nombre || ganancia.origenTarjetaNombre || 'Tarjeta')}</strong></span></div>`
            : ganancia.tipo === 'recibido' && ganancia.origenEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Recibido en efectivo</strong></span></div>'
            : ganancia.tipo === 'recibido' && ganancia.origenTarjetaId
            ? `<div class="ganancia-destino"><i class="fa-solid fa-credit-card"></i><span>Recibido en: <strong>${escaparHtml(tarjetas.find(tarjeta => tarjeta.id === ganancia.origenTarjetaId)?.nombre || ganancia.origenTarjetaNombre || 'Tarjeta')}</strong></span></div>`
            : ganancia.destinoEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Cobrado en efectivo</strong></span></div>'
            : ganancia.tarjetaDestinoId || ganancia.tarjetaDestinoNombre
            ? `<div class="ganancia-destino"><i class="fa-solid fa-wallet"></i><span>Enviado a: <strong>${escaparHtml(tarjetaDestino ? tarjetaDestino.nombre : (ganancia.tarjetaDestinoNombre || 'Tarjeta registrada'))}</strong></span></div>`
            : '<div class="ganancia-destino sin-destino"><i class="fa-solid fa-clock"></i><span>Sin tarjeta de destino</span></div>';
        const estadoClase = estado === 'pagado' ? 'pagado' : 'pendiente';
        const estadoTexto = ganancia.tipo === 'retiro_efectivo'
            ? '↘ Retiro registrado'
            : esMovimiento
            ? (ganancia.tipo === 'deuda' ? (estado === 'pagado' ? '✅ Deuda pagada' : '⏳ Deuda pendiente') : ganancia.tipo === 'prestado' ? (estado === 'pagado' ? '✅ Pagado' : '⏳ Deuda pendiente') : `📌 ${ganancia.tipo === 'cobrado' ? 'Cobro realizado' : 'Movimiento registrado'}`)
            : (estado === 'pagado' ? '✅ Pagado' : '⏳ Pendiente');
        const descripcionesPorDia = ganancia.descripcionesPorDia || {};
        const descripcionesHtml = Object.keys(descripcionesPorDia).length > 0
            ? `<div class="ganancia-descripciones-dias">${dias.map(dia => {
                const trabajos = Array.isArray(descripcionesPorDia[dia]) ? descripcionesPorDia[dia] : [{ descripcion: descripcionesPorDia[dia], monto: null }];
                const detalles = trabajos.map(trabajo => {
                    const descripcion = typeof trabajo === 'string' ? trabajo : trabajo.descripcion;
                    const precio = typeof trabajo === 'object' && trabajo.monto !== null && !isNaN(Number(trabajo.monto)) ? ` - $${Number(trabajo.monto).toFixed(2)}` : '';
                    return `${descripcion}${precio}`;
                }).join(' / ');
                    return `<div><strong>${nombresDias[dia]}:</strong> ${escaparHtml(detalles)}</div>`;
            }).join('')}</div>`
            : (ganancia.descripcion ? `<div class="ganancia-descripcion">${escaparHtml(ganancia.descripcion)}</div>` : '');

        div.innerHTML = `
            <div class="ganancia-header">
                <div class="ganancia-dias">
                    ${diasBadges}
                    ${modalidad}
                </div>
                <span class="ganancia-estado ${estadoClase}">${estadoTexto}</span>
            </div>
            <div class="ganancia-body">
                <div class="ganancia-stat monto">
                    <div class="ganancia-stat-label">Monto Total</div>
                    <div class="ganancia-stat-value">$${ganancia.monto.toFixed(2)}</div>
                </div>
                <div class="ganancia-stat fecha">
                    <div class="ganancia-stat-label">Fecha y hora</div>
                    <div class="ganancia-stat-value">${new Date(ganancia.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</div>
                </div>
            </div>
            <div class="estados-valor-comision">${etiquetaCampoEdicion(ganancia, 'monto', 'Valor')} ${etiquetaCampoEdicion(ganancia, 'comision', 'Comisión')}</div>
            ${descripcionesHtml}
            ${destinoHtml}
            <div class="ganancia-acciones">
                ${!esMovimiento ? `
                <button class="btn-accion btn-edit" onclick="editarRegistroEnTabla('${ganancia.id}', this)">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                ` : ''}
                ${esMovimiento ? `
                <button class="btn-accion btn-edit" onclick="editarRegistroEnTabla('${ganancia.id}', this)">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="btn-accion btn-delete" onclick="eliminarRegistro('${ganancia.id}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
                ` : ''}
                ${ganancia.tipo !== 'deuda' && ganancia.tipo !== 'retiro_efectivo' ? `<button class="btn-accion btn-destino" onclick="abrirEditarDestinoCalendario('${ganancia.id}', ${esMovimiento})">
                    <i class="fa-solid fa-wallet"></i> ${ganancia.tarjetaDestinoId || ganancia.destinoEfectivo ? 'Cambiar destino' : 'Asignar tarjeta'}
                </button>` : ''}
                ${ganancia.tipo === 'deuda' && estado !== 'pagado' ? `
                <button class="btn-accion btn-pay" onclick="marcarDeudaComoPagada('${ganancia.id}')">
                    <i class="fa-solid fa-file-invoice-dollar"></i> Pagar deuda
                </button>
                ` : ''}
                ${ganancia.tipo === 'prestado' && estado !== 'pagado' ? `
                <button class="btn-accion btn-pay" onclick="marcarPrestamoComoPagado('${ganancia.id}')">
                    <i class="fa-solid fa-check"></i> Pagar deuda
                </button>
                ` : ''}
                ${estado === 'pendiente' && (esMovimiento ? ganancia.tipo === 'pendiente' : true) ? `
                <button class="btn-accion btn-pay" onclick="${esMovimiento ? `marcarComoCobrado('${ganancia.id}')` : `marcarGananciaComoPagada('${ganancia.id}')`}">
                    <i class="fa-solid fa-check"></i> Cobrar
                </button>
                ` : ''}
                ${!esMovimiento ? `
                <button class="btn-accion btn-delete" onclick="eliminarGananciaSemanal('${ganancia.id}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
                ` : ''}
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function claveFechaRegistro(fechaHora) {
    return String(fechaHora || '').slice(0, 10);
}

function obtenerTodosLosMovimientosParaCalendario() {
    const movimientos = [
        ...registros,
        ...gananciasSemanales,
        ...retirosEfectivo,
        ...gastosMios,
        ...obtenerRetirosTarjetas().map(retiro => ({
            ...retiro,
            tipo: 'retiro_tarjeta',
            cliente: retiro.tarjetaNombre || 'Retiro por tarjeta'
        }))
    ];
    return movimientos.filter(item => item.fechaHora && !item.ocultoCalendario && !item.eliminadoSinDevolver);
}

function nombreTipoMovimientoCalendario(item) {
    const nombres = {
        cobrado: 'Cobro realizado',
        pendiente: 'Cobro pendiente',
        prestado: 'Dinero prestado',
        recibido: 'Dinero recibido',
        deuda: 'Deuda',
        ganancia_semanal: 'Día de trabajo',
        retiro_efectivo: 'Retiro en efectivo',
        retiro_tarjeta: 'Retiro por tarjeta',
        gasto_mio: 'Gasto mío',
        gasto_casa: 'Gasto de casa'
    };
    return nombres[item.tipo] || 'Movimiento';
}

function obtenerMontoVisualCalendario(item) {
    return Number.isFinite(Number(item.montoVisualCalendario)) ? Number(item.montoVisualCalendario) : Number(item.monto) || 0;
}

function obtenerOrigenVisualCalendario(item) {
    if (item.origenVisualCalendario) return item.origenVisualCalendario;
    if (item.origenEfectivo || item.destinoEfectivo) return 'Efectivo';
    if (item.origenTarjetaNombre || item.tarjetaDestinoNombre) return item.origenTarjetaNombre || item.tarjetaDestinoNombre;
    if (item.tarjetaNombre) return item.tarjetaNombre;
    return 'Sin origen asignado';
}

function obtenerBaseEdicionCalendario(item) {
    if (!item.baseEdicionCalendario) {
        item.baseEdicionCalendario = {
            monto: Number(item.monto) || 0,
            origen: item.origenEfectivo || item.destinoEfectivo
                ? 'Efectivo'
                : item.origenTarjetaNombre || item.tarjetaDestinoNombre || item.tarjetaNombre || 'Sin origen asignado',
            descripcion: item.descripcion || item.cliente || '',
            fechaHora: item.fechaHora || ''
        };
    }
    return item.baseEdicionCalendario;
}

function rellenarOrigenVisualCalendario(item) {
    const origenActual = item.origenVisualCalendario || (item.origenEfectivo || item.destinoEfectivo ? 'efectivo' : item.origenTarjetaId || item.tarjetaDestinoId || item.tarjetaId || '');
    selectOrigenCalendarioVisual.innerHTML = '<option value="">Sin origen asignado</option><option value="efectivo">Efectivo</option>';
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = tarjeta.nombre;
        selectOrigenCalendarioVisual.appendChild(option);
    });
    selectOrigenCalendarioVisual.value = Array.from(selectOrigenCalendarioVisual.options).some(option => option.value === origenActual) ? origenActual : '';
}

function solicitarSeguridadCalendario(accion) {
    accionSeguridadCalendario = accion;
    formSeguridadCalendario.reset();
    actualizarEstadoBloqueoSeguridad();
    modalSeguridadCalendario.hidden = false;
    modalSeguridadCalendario.style.display = 'flex';
    if (!contrasenaCalendarioInput.disabled) contrasenaCalendarioInput.focus();
}

function solicitarSeguridadEliminacion(accion) {
    solicitarSeguridadCalendario(accion);
}

function buscarMovimientoCalendario(tipo, id) {
    if (tipo === 'retiro_tarjeta') return obtenerRetirosTarjetas().find(item => item.id === id);
    const colecciones = {
        retiro_efectivo: retirosEfectivo,
        gasto_mio: gastosMios,
        gasto_casa: gastosMios,
        ganancia_semanal: gananciasSemanales,
        registro: registros
    };
    return colecciones[tipo]?.find(item => item.id === id);
}

function abrirEdicionDesdeCalendario(tipo, id) {
    const item = buscarMovimientoCalendario(tipo, id);
    if (!item) return;
    movimientoCalendarioEnEdicion = { tipo, id, item };
    solicitarSeguridadCalendario(() => {
        inputMontoCalendarioVisual.value = obtenerMontoVisualCalendario(item).toFixed(2);
        rellenarOrigenVisualCalendario(item);
        inputDescripcionCalendarioVisual.value = item.descripcion || item.cliente || '';
        inputFechaCalendarioVisual.value = item.fechaHora || obtenerFechaHoraLocal();
        modalEditarCalendarioVisual.hidden = false;
        modalEditarCalendarioVisual.style.display = 'flex';
        inputDescripcionCalendarioVisual.focus();
    });
}

function eliminarDesdeCalendario(tipo, id) {
    const item = buscarMovimientoCalendario(tipo, id);
    if (!item) return;
    solicitarSeguridadCalendario(async () => {
        const real = tipo === 'retiro_tarjeta'
            ? tarjetas.find(tarjeta => tarjeta.id === item.tarjetaId)?.retiros?.find(retiro => retiro.id === id)
            : item;
        if (!real) return;
        real.ocultoCalendario = true;
        if (tipo === 'retiro_tarjeta') await guardarTarjetas();
        else {
            await guardarRegistroEnSupabase(real);
            guardarYActualizar();
        }
        mostrarDetalleDiaRegistros(claveFechaRegistro(real.fechaHora));
        renderCalendarioRegistros();
    });
}

function mostrarDetalleDiaRegistros(fechaClave) {
    detalleDiaRegistros.dataset.fecha = fechaClave;
    const movimientos = obtenerTodosLosMovimientosParaCalendario().filter(item => claveFechaRegistro(item.fechaHora) === fechaClave);
    const [anio, mes, dia] = fechaClave.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const fechaTexto = fecha.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    if (movimientos.length === 0) {
        detalleDiaRegistros.innerHTML = `<h3><i class="fa-solid fa-calendar-xmark"></i> ${fechaTexto}</h3><p class="dia-sin-registros">Día sin registro.</p>`;
        return;
    }
    detalleDiaRegistros.innerHTML = `<h3><i class="fa-solid fa-list-check"></i> Registros del ${fechaTexto}</h3><div class="detalle-dia-lista">${ordenarPorFecha(movimientos).map(item => {
        const tipo = ['ganancia_semanal', 'retiro_efectivo', 'retiro_tarjeta', 'gasto_mio', 'gasto_casa'].includes(item.tipo) ? item.tipo : 'registro';
        const id = escaparHtml(item.id);
        const estaModificado = Boolean(item.modificadoCalendario || item.modificadoRegistro);
        const montoVisual = obtenerMontoVisualCalendario(item);
        const origenVisual = obtenerOrigenVisualCalendario(item);
        return `<article class="detalle-dia-item"><div><strong>${escaparHtml(item.descripcion || item.cliente || nombreTipoMovimientoCalendario(item))}</strong><span>${nombreTipoMovimientoCalendario(item)} · ${new Date(item.fechaHora).toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })} · ${escaparHtml(origenVisual)}</span></div><div class="detalle-dia-monto"><b>$${montoVisual.toFixed(2)}</b>${etiquetaCampoEdicion(item, 'monto', 'Monto')}${etiquetaCampoEdicion(item, 'comision', 'Comisión')}</div><div class="detalle-dia-acciones"><button type="button" class="btn-calendario-editar" data-calendario-editar="${id}" data-calendario-tipo="${tipo}" title="Editar registro" aria-label="Editar registro"><i class="fa-solid fa-pen"></i></button><button type="button" class="btn-calendario-eliminar" data-calendario-eliminar="${id}" data-calendario-tipo="${tipo}" title="Eliminar registro" aria-label="Eliminar registro"><i class="fa-solid fa-trash"></i></button></div></article>`;
    }).join('')}</div>`;
}

function renderCalendarioRegistros() {
    const anio = mesCalendarioActual.getFullYear();
    const mes = mesCalendarioActual.getMonth();
    const primerDia = new Date(anio, mes, 1);
    const diasMes = new Date(anio, mes + 1, 0).getDate();
    const inicioSemana = primerDia.getDay();
    const movimientos = obtenerTodosLosMovimientosParaCalendario();
    const fechasConRegistro = new Set(movimientos.map(item => claveFechaRegistro(item.fechaHora)));
    const nombresMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    mesCalendarioRegistros.textContent = `${nombresMeses[mes].charAt(0).toUpperCase() + nombresMeses[mes].slice(1)} ${anio}`;
    calendarioRegistrosGrid.innerHTML = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(dia => `<div class="calendario-dia-semana">${dia}</div>`).join('');
    for (let indice = 0; indice < inicioSemana; indice += 1) calendarioRegistrosGrid.insertAdjacentHTML('beforeend', '<div class="calendario-dia calendario-dia-vacio"></div>');
    for (let dia = 1; dia <= diasMes; dia += 1) {
        const clave = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const tieneRegistro = fechasConRegistro.has(clave);
        calendarioRegistrosGrid.insertAdjacentHTML('beforeend', `<button type="button" class="calendario-dia ${tieneRegistro ? 'con-registro' : ''}" data-fecha-calendario="${clave}"><span>${dia}</span>${tieneRegistro ? '<i class="calendario-punto"></i>' : ''}</button>`);
    }
}

function abrirCalendarioRegistros(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirCalendarioRegistros(true));
        return;
    }
    mesCalendarioActual = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    renderCalendarioRegistros();
    detalleDiaRegistros.innerHTML = '<h3><i class="fa-solid fa-hand-pointer"></i> Selecciona un día</h3>';
    modalCalendarioRegistros.hidden = false;
    modalCalendarioRegistros.style.display = 'flex';
}

function cerrarCalendarioRegistros() {
    modalCalendarioRegistros.hidden = true;
    modalCalendarioRegistros.style.display = 'none';
}

window.abrirEditarDestinoCalendario = function(id, esMovimiento, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.abrirEditarDestinoCalendario(id, esMovimiento, true));
        return;
    }
    const elemento = esMovimiento
        ? [...registros, ...retirosEfectivo].find(registro => registro.id === id)
        : gananciasSemanales.find(ganancia => ganancia.id === id);
    if (!elemento) return;

    elemento.enCalendario = true;

    elementoCalendarioEnEdicion = elemento;
    inputMontoCalendario.value = Number(elemento.monto).toFixed(2);
    const esDineroRecibido = elemento.tipo === 'recibido';
    selectDestinoCalendario.innerHTML = esDineroRecibido
        ? '<option value="">Sin destino seleccionado</option><option value="efectivo">Mandado a efectivo</option>'
        : '<option value="">Sin tarjeta de destino</option><option value="efectivo">Cobrado en efectivo</option>';
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `${tarjeta.nombre} ($${tarjeta.monto.toFixed(2)})`;
        option.selected = tarjeta.id === elemento.tarjetaDestinoId;
        selectDestinoCalendario.appendChild(option);
    });
    selectDestinoCalendario.value = esDineroRecibido
        ? (elemento.destinoEfectivo ? 'efectivo' : (elemento.tarjetaDestinoId || ''))
        : (elemento.destinoEfectivo ? 'efectivo' : (elemento.tarjetaDestinoId || ''));
    inputComisionCalendario.value = Number(elemento.comisionTarjeta) || 0;
    grupoComisionCalendario.hidden = !elemento.tarjetaDestinoId && !elemento.origenTarjetaId;
    modalEditarDestinoCalendario.style.display = 'flex';
    inputMontoCalendario.focus();
}

window.cerrarModalEditarDestinoCalendario = function() {
    modalEditarDestinoCalendario.style.display = 'none';
    elementoCalendarioEnEdicion = null;
}

window.guardarCorreccionCalendario = async function() {
    if (!elementoCalendarioEnEdicion) return;

    const montoNuevo = convertirMonto(inputMontoCalendario.value);
    if (!Number.isFinite(montoNuevo) || montoNuevo <= 0) {
        alert('Ingresa un monto válido.');
        inputMontoCalendario.focus();
        return;
    }

    const esDineroRecibido = elementoCalendarioEnEdicion.tipo === 'recibido';
    const esDineroPrestado = elementoCalendarioEnEdicion.tipo === 'prestado';
    const usaOrigenTarjeta = esDineroPrestado;
    const campoTarjeta = usaOrigenTarjeta ? 'origenTarjetaId' : 'tarjetaDestinoId';
    const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === elementoCalendarioEnEdicion[campoTarjeta]);
    const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === selectDestinoCalendario.value);
    const efectivoNuevo = selectDestinoCalendario.value === 'efectivo';
    const comisionNueva = Number(inputComisionCalendario.value) || 0;
    if (!Number.isFinite(comisionNueva) || comisionNueva < 0) {
        alert('Ingresa una comisión válida.');
        inputComisionCalendario.focus();
        return;
    }
    const comisionAnterior = Number(elementoCalendarioEnEdicion.comisionTarjeta) || 0;
    const dineroYaEnviado = elementoCalendarioEnEdicion.estado === 'pagado' || elementoCalendarioEnEdicion.tipo === 'cobrado';

    const debeAjustarSaldo = !esDineroPrestado || elementoCalendarioEnEdicion.estado === 'pagado';
    if (!elementoCalendarioEnEdicion.fijadoContable && usaOrigenTarjeta && debeAjustarSaldo) {
        if (tarjetaNueva && tarjetaNueva.id !== (tarjetaAnterior && tarjetaAnterior.id) && tarjetaNueva.monto < montoNuevo + comisionNueva) {
            alert('La tarjeta no tiene saldo suficiente para este retiro.');
            return;
        }
        if (esDineroRecibido) {
            if (tarjetaAnterior) tarjetaAnterior.monto += elementoCalendarioEnEdicion.monto + comisionAnterior;
            if (tarjetaNueva) tarjetaNueva.monto -= montoNuevo + comisionNueva;
        } else {
            if (tarjetaAnterior) tarjetaAnterior.monto += elementoCalendarioEnEdicion.monto + comisionAnterior;
            if (tarjetaNueva) tarjetaNueva.monto -= montoNuevo + comisionNueva;
        }
    } else if (!elementoCalendarioEnEdicion.fijadoContable && dineroYaEnviado) {
        const netoAnterior = Math.max(0, elementoCalendarioEnEdicion.monto - comisionAnterior);
        const netoNuevo = Math.max(0, montoNuevo - comisionNueva);
        if (tarjetaAnterior && tarjetaAnterior.id === (tarjetaNueva && tarjetaNueva.id)) {
            tarjetaAnterior.monto += netoNuevo - netoAnterior;
        } else {
            if (tarjetaAnterior) tarjetaAnterior.monto -= netoAnterior;
            if (tarjetaNueva) tarjetaNueva.monto += netoNuevo;
        }
    }

    elementoCalendarioEnEdicion.monto = montoNuevo;
    elementoCalendarioEnEdicion.comisionTarjeta = tarjetaNueva ? comisionNueva : 0;
    actualizarEstadoEdicionRegistro(elementoCalendarioEnEdicion);
    if (usaOrigenTarjeta) {
        elementoCalendarioEnEdicion.origenTarjetaId = tarjetaNueva ? tarjetaNueva.id : null;
        elementoCalendarioEnEdicion.origenTarjetaNombre = tarjetaNueva ? tarjetaNueva.nombre : '';
        elementoCalendarioEnEdicion.origenEfectivo = efectivoNuevo;
    } else {
        elementoCalendarioEnEdicion.tarjetaDestinoId = tarjetaNueva ? tarjetaNueva.id : null;
        elementoCalendarioEnEdicion.tarjetaDestinoNombre = tarjetaNueva ? tarjetaNueva.nombre : '';
        elementoCalendarioEnEdicion.destinoEfectivo = efectivoNuevo;
    }
    const guardado = await guardarRegistroEnSupabase(elementoCalendarioEnEdicion);
    if (!guardado) return;

    guardarTarjetas();
    guardarYActualizar();
    cerrarModalEditarDestinoCalendario();
}

window.marcarGananciaComoPagada = function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.marcarGananciaComoPagada(id, true));
        return;
    }
    const ganancia = gananciasSemanales.find(g => g.id === id);
    if (ganancia) {
        registroPendienteDePago = { registro: ganancia, estado: ganancia.estado };
        ganancia.estado = 'pagado';
        registroPendienteDeGuardar = ganancia;
        mostrarModalSeleccionarTarjeta();
    }
}


window.eliminarGananciaSemanal = async function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => window.eliminarGananciaSemanal(id, true));
        return;
    }
    const ganancia = gananciasSemanales.find(item => item.id === id);
    if (!ganancia) return;

    gananciaPendienteDeEliminar = ganancia;
    registroPendienteDeEliminar = null;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    modalTituloEliminacion.textContent = '¿Eliminar esta ganancia?';
    modalMensajeEliminacion.textContent = 'Se eliminará el registro del calendario y esta acción no se puede deshacer.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

btnAgregarGananciaSemanal.addEventListener('click', abrirModalGanancia);

btnVerHistorialRetiros.addEventListener('click', () => abrirHistorialRetiros());
btnCerrarHistorialRetiros.addEventListener('click', cerrarHistorialRetiros);
modalHistorialRetiros.addEventListener('click', function(e) {
    if (e.target === modalHistorialRetiros) cerrarHistorialRetiros();
});

function abrirHistorialCalendario(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialCalendario(true));
        return;
    }
    renderGananciasSemanales(true, listaHistorialCalendarioCompleto);
    modalHistorialCalendario.hidden = false;
    modalHistorialCalendario.style.display = 'flex';
}

function cerrarHistorialCalendario() {
    modalHistorialCalendario.hidden = true;
    modalHistorialCalendario.style.display = 'none';
}

btnVerHistorialCalendario.addEventListener('click', () => abrirHistorialCalendario());
btnCerrarHistorialCalendario.addEventListener('click', cerrarHistorialCalendario);
modalHistorialCalendario.addEventListener('click', function(e) {
    if (e.target === modalHistorialCalendario) cerrarHistorialCalendario();
});
btnVerCalendarioRegistros.addEventListener('click', () => abrirCalendarioRegistros());
btnCerrarCalendarioRegistros.addEventListener('click', cerrarCalendarioRegistros);
btnMesAnterior.addEventListener('click', () => {
    mesCalendarioActual = new Date(mesCalendarioActual.getFullYear(), mesCalendarioActual.getMonth() - 1, 1);
    renderCalendarioRegistros();
});
btnMesSiguiente.addEventListener('click', () => {
    mesCalendarioActual = new Date(mesCalendarioActual.getFullYear(), mesCalendarioActual.getMonth() + 1, 1);
    renderCalendarioRegistros();
});
calendarioRegistrosGrid.addEventListener('click', event => {
    const dia = event.target.closest('[data-fecha-calendario]');
    if (dia) mostrarDetalleDiaRegistros(dia.dataset.fechaCalendario);
});
detalleDiaRegistros.addEventListener('click', event => {
    const editar = event.target.closest('[data-calendario-editar]');
    const eliminar = event.target.closest('[data-calendario-eliminar]');
    if (editar) abrirEdicionDesdeCalendario(editar.dataset.calendarioTipo, editar.dataset.calendarioEditar);
    if (eliminar) eliminarDesdeCalendario(eliminar.dataset.calendarioTipo, eliminar.dataset.calendarioEliminar);
});
modalCalendarioRegistros.addEventListener('click', event => {
    if (event.target === modalCalendarioRegistros) cerrarCalendarioRegistros();
});
formSeguridadCalendario.addEventListener('submit', async event => {
    event.preventDefault();
    if (obtenerBloqueoSeguridadHasta() > Date.now()) {
        actualizarEstadoBloqueoSeguridad();
        return;
    }
    if (contrasenaCalendarioInput.value !== contrasenaActual) {
        registrarIntentoFallidoSeguridad();
        contrasenaCalendarioInput.value = '';
        if (!obtenerBloqueoSeguridadHasta()) contrasenaCalendarioInput.focus();
        return;
    }
    sessionStorage.removeItem(CLAVE_INTENTOS_SEGURIDAD);
    sessionStorage.removeItem(CLAVE_BLOQUEO_SEGURIDAD);
    clearInterval(temporizadorBloqueoSeguridad);
    contrasenaCalendarioInput.disabled = false;
    btnContinuarSeguridadCalendario.disabled = false;
    const accion = accionSeguridadCalendario;
    accionSeguridadCalendario = null;
    modalSeguridadCalendario.hidden = true;
    modalSeguridadCalendario.style.display = 'none';
    if (accion) await accion();
});
btnCancelarSeguridadCalendario.addEventListener('click', () => {
    accionSeguridadCalendario = null;
    modalSeguridadCalendario.hidden = true;
    modalSeguridadCalendario.style.display = 'none';
});
btnCerrarEditarCalendarioVisual.addEventListener('click', () => {
    movimientoCalendarioEnEdicion = null;
    modalEditarCalendarioVisual.hidden = true;
    modalEditarCalendarioVisual.style.display = 'none';
});
btnCancelarEditarCalendarioVisual.addEventListener('click', () => btnCerrarEditarCalendarioVisual.click());
btnGuardarEditarCalendarioVisual.addEventListener('click', async () => {
    const movimiento = movimientoCalendarioEnEdicion;
    const descripcion = inputDescripcionCalendarioVisual.value.trim();
    const fechaHora = inputFechaCalendarioVisual.value;
    const montoVisual = Number(inputMontoCalendarioVisual.value);
    const origenVisual = selectOrigenCalendarioVisual.value;
    const origenNombreVisual = origenVisual === 'efectivo'
        ? 'Efectivo'
        : tarjetas.find(tarjeta => tarjeta.id === origenVisual)?.nombre || 'Sin origen asignado';
    if (!movimiento || !descripcion || !fechaHora || !Number.isFinite(montoVisual) || montoVisual < 0) return;
    const item = movimiento.tipo === 'retiro_tarjeta'
        ? tarjetas.find(tarjeta => tarjeta.id === movimiento.item.tarjetaId)?.retiros?.find(retiro => retiro.id === movimiento.id)
        : movimiento.item;
    if (!item) return;
    const baseEdicion = obtenerBaseEdicionCalendario(item);
    const huboCambio = montoVisual !== Number(baseEdicion.monto)
        || origenNombreVisual !== baseEdicion.origen
        || descripcion !== baseEdicion.descripcion
        || fechaHora !== baseEdicion.fechaHora;
    item.montoVisualCalendario = montoVisual;
    item.origenVisualCalendario = origenNombreVisual;
    item.descripcion = descripcion;
    item.fechaHora = fechaHora;
    item.modificadoCalendario = huboCambio;
    if (movimiento.tipo === 'retiro_tarjeta') await guardarTarjetas();
    else {
        await guardarRegistroEnSupabase(item);
        guardarYActualizar();
    }
    modalEditarCalendarioVisual.hidden = true;
    modalEditarCalendarioVisual.style.display = 'none';
    movimientoCalendarioEnEdicion = null;
    mostrarDetalleDiaRegistros(claveFechaRegistro(fechaHora));
    renderCalendarioRegistros();
});
modalSeguridadCalendario.addEventListener('click', event => {
    if (event.target === modalSeguridadCalendario) btnCancelarSeguridadCalendario.click();
});
modalEditarCalendarioVisual.addEventListener('click', event => {
    if (event.target === modalEditarCalendarioVisual) btnCerrarEditarCalendarioVisual.click();
});

// Cerrar modal ganancia al hacer click fuera
modalAgregarGanancia.addEventListener('click', function(e) {
    if (e.target === modalAgregarGanancia) {
        solicitarCancelarGanancia();
    }
});

btnCerrarCancelarEdicion.addEventListener('click', cerrarConfirmacionCancelarEdicion);
btnSeguirEditando.addEventListener('click', cerrarConfirmacionCancelarEdicion);
btnConfirmarCancelarEdicion.addEventListener('click', confirmarCancelarEdicion);

modalCancelarEdicion.addEventListener('click', function(e) {
    if (e.target === modalCancelarEdicion) {
        cerrarConfirmacionCancelarEdicion();
    }
});

modalEditarDestinoCalendario.addEventListener('click', function(e) {
    if (e.target === modalEditarDestinoCalendario) {
        cerrarModalEditarDestinoCalendario();
    }
});

function obtenerSaldoOrigenGasto(origen, gastoExcluido = null) {
    if (origen === 'efectivo') {
        return calcularEfectivoDisponible() + (gastoExcluido?.origenEfectivo ? Number(gastoExcluido.monto) || 0 : 0);
    }
    const tarjeta = tarjetas.find(item => item.id === origen);
    const saldo = tarjeta ? Number(tarjeta.monto) || 0 : 0;
    return saldo + (gastoExcluido?.origenTarjetaId === origen ? (Number(gastoExcluido.monto) || 0) + (Number(gastoExcluido.comisionTarjeta) || 0) : 0);
}

function devolverMontoGastoAlOrigen(gasto) {
    if (gasto.origenTarjetaId) {
        const tarjeta = tarjetas.find(item => item.id === gasto.origenTarjetaId);
        if (tarjeta) tarjeta.monto += (Number(gasto.monto) || 0) + (Number(gasto.comisionTarjeta) || 0);
    }
}

function descontarMontoGastoDelOrigen(gasto) {
    if (gasto.origenTarjetaId) {
        const tarjeta = tarjetas.find(item => item.id === gasto.origenTarjetaId);
        if (tarjeta) tarjeta.monto -= (Number(gasto.monto) || 0) + (Number(gasto.comisionTarjeta) || 0);
    }
}

async function guardarGastoMioDesdeFormulario(id) {
    const monto = Number(montoInput.value);
    const esGastoCasa = tipoInput.value === 'gasto_casa';
    const descripcion = esGastoCasa ? (descripcionInput.value.trim() || 'Gasto de casa') : descripcionInput.value.trim();
    const comisionTarjeta = Number(comisionGastoInput.value) || 0;
    const fechaHora = fechaHoraInput.value;
    const origen = fuenteGastoSelect.value;
    const gastoOriginal = id ? gastosMios.find(gasto => gasto.id === id) : null;

    if (!Number.isFinite(monto) || monto <= 0 || !Number.isFinite(comisionTarjeta) || comisionTarjeta < 0 || (!esGastoCasa && !descripcion) || !fechaHora || !origen) {
        alert(esGastoCasa ? 'Completa monto, fecha y origen del dinero.' : 'Completa monto, fecha, descripción y origen del dinero.');
        return false;
    }
    const saldoDisponible = obtenerSaldoOrigenGasto(origen, gastoOriginal);
    const totalGasto = monto + (origen === 'efectivo' ? 0 : comisionTarjeta);
    if (!gastoOriginal?.fijadoContable && totalGasto > saldoDisponible) {
        alert(`No hay suficiente dinero en el origen seleccionado. Disponible: $${saldoDisponible.toFixed(2)}.`);
        return false;
    }

    if (gastoOriginal && !gastoOriginal.fijadoContable) devolverMontoGastoAlOrigen(gastoOriginal);
    const gasto = gastoOriginal || {
        id: '',
        tipo: tipoInput.value,
        cliente: esGastoCasa ? 'Gasto de casa' : 'Gasto mío',
        enCalendario: false,
        estado: 'pagado'
    };
    gasto.monto = monto;
    gasto.descripcion = descripcion;
    gasto.fechaHora = fechaHora;
    gasto.comisionTarjeta = origen === 'efectivo' ? 0 : comisionTarjeta;
    gasto.origenEfectivo = origen === 'efectivo';
    gasto.origenTarjetaId = gasto.origenEfectivo ? null : origen;
    gasto.origenTarjetaNombre = gasto.origenEfectivo ? 'Efectivo' : tarjetas.find(tarjeta => tarjeta.id === origen)?.nombre || '';
    actualizarEstadoEdicionRegistro(gasto, origen);
    if (!gasto.fijadoContable) descontarMontoGastoDelOrigen(gasto);

    const nuevoId = await guardarRegistroEnSupabase(gasto);
    if (!nuevoId) {
        if (gastoOriginal) descontarMontoGastoDelOrigen(gastoOriginal);
        return false;
    }
    gasto.id = nuevoId;
    if (!gastoOriginal) gastosMios.unshift(gasto);
    await guardarTarjetas();
    guardarYActualizar();
    resetFormulario();
    return true;
}


form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (form.dataset.autorizado !== 'true') {
        if (!form.reportValidity()) return;
        solicitarSeguridadCalendario(() => {
            form.dataset.autorizado = 'true';
            form.requestSubmit();
        });
        return;
    }
    delete form.dataset.autorizado;

    const id = registroIdInput.value;
    const tipo = tipoInput.value;
    const cliente = clienteInput.value.trim();
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim() || 'Sin detalle';
    const fechaHora = fechaHoraInput.value;
    const registroOriginal = id ? registros.find(registro => registro.id === id) : null;

    const nuevoRegistro = {
        id,
        tipo,
        cliente,
        monto,
        descripcion,
        fechaHora,
        enCalendario: true,
        tarjetaDestinoId: registroOriginal ? registroOriginal.tarjetaDestinoId || null : null,
        tarjetaDestinoNombre: registroOriginal ? registroOriginal.tarjetaDestinoNombre || '' : '',
        destinoEfectivo: registroOriginal ? Boolean(registroOriginal.destinoEfectivo) : false,
        origenTarjetaId: registroOriginal ? registroOriginal.origenTarjetaId || null : null,
        origenTarjetaNombre: registroOriginal ? registroOriginal.origenTarjetaNombre || '' : '',
        origenEfectivo: registroOriginal ? Boolean(registroOriginal.origenEfectivo) : false,
        comisionTarjeta: registroOriginal ? Number(registroOriginal.comisionTarjeta) || 0 : 0,
        fijadoContable: registroOriginal ? Boolean(registroOriginal.fijadoContable) : false,
        modificadoRegistro: registroOriginal ? Boolean(registroOriginal.modificadoRegistro) : false,
        baseEdicionRegistro: registroOriginal ? registroOriginal.baseEdicionRegistro : null
    };

    if (tipo === 'gasto_mio' || tipo === 'gasto_casa') {
        await guardarGastoMioDesdeFormulario(id);
        return;
    }

    if (tipo === 'retiro_efectivo' && !id) {
        limpiarAvisosSaldoRetiro();
        const saldoDisponible = calcularEfectivoDisponible();
        if (!Number.isFinite(monto) || monto <= 0 || monto > saldoDisponible) {
            mostrarSaldoInsuficienteEnFormulario(monto, saldoDisponible);
            return;
        }
        abrirConfirmacionRetiroEfectivo(monto, descripcion, fechaHora);
        return;
    }

    if (tipo === 'retiro_tarjeta' && !id) {
        if (tarjetas.length === 0) {
            alert('Primero agrega una tarjeta para poder retirar dinero.');
            return;
        }
        const tarjetaRetiro = tarjetas.find(tarjeta => tarjeta.id === tarjetaDestinoSelect.value);
        if (!tarjetaRetiro) {
            alert('Selecciona la tarjeta de la que quieres retirar.');
            tarjetaDestinoSelect.focus();
            return;
        }
        const comision = Number(comisionRetiroTarjetaInput.value) || 0;
        const totalRetiro = monto + comision;
        if (!Number.isFinite(comision) || comision < 0) {
            alert('Ingresa una comisión válida.');
            comisionRetiroTarjetaInput.focus();
            return;
        }
        if (!Number.isFinite(monto) || monto <= 0 || totalRetiro > tarjetaRetiro.monto) {
            alert(`El retiro más la comisión no puede superar el saldo de la tarjeta ($${tarjetaRetiro.monto.toFixed(2)}).`);
            montoInput.focus();
            return;
        }
        const retiro = {
            id: Date.now().toString(),
            monto,
            comision,
            descripcion: descripcion === 'Sin detalle' ? 'Retiro por tarjeta' : descripcion,
            fechaHora
        };
        tarjetaRetiro.monto -= totalRetiro;
        tarjetaRetiro.retiros = Array.isArray(tarjetaRetiro.retiros) ? tarjetaRetiro.retiros : [];
        tarjetaRetiro.retiros.push(retiro);
        await guardarTarjetas();
        guardarYActualizar();
        resetFormulario();
        return;
    }

    // Los cobros eligen destino al registrarse; el préstamo elige origen al pagarse.
    if (tipo === 'cobrado' && !id) {
        if (tarjetaDestinoSelect.value) {
            const comision = Number(comisionCobroInput.value) || 0;
            nuevoRegistro.estado = 'pagado';
            nuevoRegistro.destinoEfectivo = tarjetaDestinoSelect.value === 'efectivo';
            const tarjetaDestino = tarjetas.find(tarjeta => tarjeta.id === tarjetaDestinoSelect.value);
            if (!Number.isFinite(comision) || comision < 0) {
                alert('Ingresa una comisión válida.');
                comisionCobroInput.focus();
                return;
            }
            nuevoRegistro.tarjetaDestinoId = tarjetaDestino ? tarjetaDestino.id : null;
            nuevoRegistro.tarjetaDestinoNombre = tarjetaDestino ? tarjetaDestino.nombre : '';
            nuevoRegistro.comisionTarjeta = tarjetaDestino ? comision : 0;
            const nuevoId = await guardarRegistroEnSupabase(nuevoRegistro);
            if (!nuevoId) return;
            nuevoRegistro.id = nuevoId;
            registros.push(nuevoRegistro);
            if (tarjetaDestino) {
                tarjetaDestino.monto += monto - comision;
                await guardarTarjetas();
            }
            guardarYActualizar();
            resetFormulario();
            return;
        }
        registroPendienteDeGuardar = nuevoRegistro;
        mostrarModalSeleccionarTarjeta();
        return;
    }

    if ((tipo === 'prestado' || tipo === 'deuda' || tipo === 'recibido') && !id) {
        nuevoRegistro.estado = 'pendiente';
    }

    if (id && registroOriginal && (tipo === 'prestado' || tipo === 'deuda')) {
        nuevoRegistro.estado = registroOriginal.estado || 'pendiente';
    }

    if (id && registroOriginal) {
        reconciliarSaldoRegistroEditado(nuevoRegistro);
        await guardarTarjetas();
    }

    // Para otros tipos de registro o edición, guardar normalmente
    if (id) {
        const index = registros.findIndex(r => r.id === id);
        if (index !== -1) {
            registros[index] = nuevoRegistro;
            await guardarRegistroEnSupabase(registros[index]);
        }
    } else {
        const nuevoId = await guardarRegistroEnSupabase(nuevoRegistro);
        if (!nuevoId) {
            return;
        }
        nuevoRegistro.id = nuevoId;
        registros.push(nuevoRegistro);
    }

    guardarYActualizar();
    resetFormulario();
});

async function guardarYActualizar() {
    normalizarBasesEdicion();
    localStorage.setItem('registros_cobros', JSON.stringify(registros));
    localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
    localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
    localStorage.setItem('gastos_mios', JSON.stringify(gastosMios));
    actualizarInterfaz();
}


function separarFechaHora(fechaHora) {
    const [fecha, hora] = fechaHora.split('T');
    return { fecha, hora: hora || '00:00' };
}

function detallesParaSupabase(item) {
    if (item.tipo === 'ganancia_semanal') {
        const descripciones = Object.keys(item.descripcionesPorDia || {}).length > 0
            ? ` [descripciones:${encodeURIComponent(JSON.stringify(item.descripcionesPorDia))}]`
            : '';
        const tarjetaDestino = item.tarjetaDestinoId ? ` [tarjeta:${encodeURIComponent(item.tarjetaDestinoId)}]` : '';
        const tarjetaNombre = item.tarjetaDestinoNombre ? ` [tarjetaNombre:${encodeURIComponent(item.tarjetaDestinoNombre)}]` : '';
        const efectivo = item.destinoEfectivo ? ' [efectivo:si]' : '';
        const visual = item.modificadoCalendario ? ` [modificadoCalendario:si] [montoVisualCalendario:${Number(item.montoVisualCalendario || item.monto)}] [origenVisualCalendario:${encodeURIComponent(item.origenVisualCalendario || '')}]` : '';
        const modificado = item.modificadoRegistro ? ' [modificadoRegistro:si]' : '';
        const baseRegistro = item.baseEdicionRegistro ? ` [baseEdicionRegistro:${encodeURIComponent(JSON.stringify(item.baseEdicionRegistro))}]` : '';
        const baseEdicion = item.baseEdicionCalendario ? ` [baseEdicionCalendario:${encodeURIComponent(JSON.stringify(item.baseEdicionCalendario))}]` : '';
        const oculto = item.ocultoCalendario ? ' [ocultoCalendario:si]' : '';
        const comisionTarjeta = Number(item.comisionTarjeta) > 0 ? ` [comisionTarjeta:${Number(item.comisionTarjeta)}]` : '';
        const fijado = item.fijadoContable ? ' [fijadoContable:si]' : '';
        return `${item.descripcion} [dias:${item.dias.join(',')}] [estado:${item.estado}]${descripciones}${tarjetaDestino}${tarjetaNombre}${efectivo}${comisionTarjeta}${fijado}${visual}${modificado}${baseEdicion}${baseRegistro}${oculto} ${PREFIJO_TIPO}${item.tipo}]`;
    }
    const calendario = item.enCalendario ? ' [calendario:si]' : '';
    const ocultoCalendario = item.ocultoCalendario ? ' [ocultoCalendario:si]' : '';
    const eliminadoSinDevolver = item.eliminadoSinDevolver ? ' [eliminadoSinDevolver:si]' : '';
    const fijado = item.fijadoContable ? ' [fijadoContable:si]' : '';
    const modificadoCalendario = item.modificadoCalendario ? ' [modificadoCalendario:si]' : '';
    const modificadoRegistro = item.modificadoRegistro ? ' [modificadoRegistro:si]' : '';
    const montoVisualCalendario = Number.isFinite(Number(item.montoVisualCalendario)) ? ` [montoVisualCalendario:${Number(item.montoVisualCalendario)}]` : '';
    const origenVisualCalendario = item.origenVisualCalendario ? ` [origenVisualCalendario:${encodeURIComponent(item.origenVisualCalendario)}]` : '';
    const baseEdicion = item.baseEdicionCalendario ? ` [baseEdicionCalendario:${encodeURIComponent(JSON.stringify(item.baseEdicionCalendario))}]` : '';
    const baseRegistro = item.baseEdicionRegistro ? ` [baseEdicionRegistro:${encodeURIComponent(JSON.stringify(item.baseEdicionRegistro))}]` : '';
    const tarjetaDestino = item.tarjetaDestinoId ? ` [tarjeta:${encodeURIComponent(item.tarjetaDestinoId)}]` : '';
    const tarjetaNombre = item.tarjetaDestinoNombre ? ` [tarjetaNombre:${encodeURIComponent(item.tarjetaDestinoNombre)}]` : '';
    const efectivo = item.destinoEfectivo ? ' [efectivo:si]' : '';
    const origenTarjeta = item.origenTarjetaId ? ` [origenTarjeta:${encodeURIComponent(item.origenTarjetaId)}]` : '';
    const origenNombre = item.origenTarjetaNombre ? ` [origenNombre:${encodeURIComponent(item.origenTarjetaNombre)}]` : '';
    const origenEfectivo = item.origenEfectivo ? ' [origenEfectivo:si]' : '';
    const comisionTarjeta = Number(item.comisionTarjeta) > 0 ? ` [comisionTarjeta:${Number(item.comisionTarjeta)}]` : '';
    const abonos = Array.isArray(item.abonos) && item.abonos.length > 0
        ? ` [abonos:${encodeURIComponent(JSON.stringify(item.abonos))}]`
        : '';
    const estadoRegistro = item.tipo === 'prestado' || item.tipo === 'deuda' || item.tipo === 'recibido' ? ` [estadoRegistro:${item.estado || 'pendiente'}]` : '';
    return `${item.descripcion}${calendario}${ocultoCalendario}${eliminadoSinDevolver}${fijado}${modificadoCalendario}${modificadoRegistro}${montoVisualCalendario}${origenVisualCalendario}${baseEdicion}${baseRegistro}${tarjetaDestino}${tarjetaNombre}${efectivo}${origenTarjeta}${origenNombre}${origenEfectivo}${comisionTarjeta}${abonos}${estadoRegistro} ${PREFIJO_TIPO}${item.tipo}]`;
}

function registroDesdeSupabase(item) {
    const detalles = item.detalles || 'Sin detalle';
    const tipoEncontrado = detalles.match(/\[tipo:(cobrado|pendiente|prestado|recibido|deuda|ganancia_semanal|retiro_efectivo|gasto_mio|gasto_casa)\]$/);
    const tipo = tipoEncontrado ? tipoEncontrado[1] : 'cobrado';
    
    let descripcion = detalles.replace(/\s*\[tipo:(cobrado|pendiente|prestado|recibido|deuda|ganancia_semanal|retiro_efectivo|gasto_mio|gasto_casa)\]$/, '').trim();
    let dias = [];
    let estado = tipo === 'prestado' || tipo === 'deuda' || tipo === 'recibido' ? 'pendiente' : 'pagado';
    const estadoRegistroMatch = detalles.match(/\[estadoRegistro:(pagado|pendiente)\]/);
    if (estadoRegistroMatch) estado = estadoRegistroMatch[1];
    descripcion = descripcion.replace(/\s*\[estadoRegistro:(pagado|pendiente)\]/, '').trim();
    let descripcionesPorDia = {};
    let tarjetaDestinoId = null;
    let tarjetaDestinoNombre = '';
    let origenTarjetaId = null;
    let origenTarjetaNombre = '';
    let abonos = [];
    const origenEfectivo = /\[origenEfectivo:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[origenEfectivo:si\]/, '').trim();
    const comisionTarjetaMatch = descripcion.match(/\[comisionTarjeta:([^\]]+)\]/);
    const comisionTarjeta = comisionTarjetaMatch ? Number(comisionTarjetaMatch[1]) || 0 : 0;
    descripcion = descripcion.replace(/\s*\[comisionTarjeta:[^\]]+\]/, '').trim();
    const destinoEfectivo = /\[efectivo:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[efectivo:si\]/, '').trim();
    const enCalendario = /\[calendario:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[calendario:si\]/, '').trim();
    const ocultoCalendario = /\[ocultoCalendario:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[ocultoCalendario:si\]/, '').trim();
    const eliminadoSinDevolver = /\[eliminadoSinDevolver:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[eliminadoSinDevolver:si\]/, '').trim();
    const fijadoContable = /\[fijadoContable:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[fijadoContable:si\]/, '').trim();
    const modificadoCalendario = /\[modificadoCalendario:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[modificadoCalendario:si\]/, '').trim();
    const modificadoRegistro = /\[modificadoRegistro:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[modificadoRegistro:si\]/, '').trim();
    const montoVisualMatch = descripcion.match(/\[montoVisualCalendario:([^\]]+)\]/);
    const montoVisualCalendario = montoVisualMatch ? Number(montoVisualMatch[1]) : null;
    descripcion = descripcion.replace(/\s*\[montoVisualCalendario:[^\]]+\]/, '').trim();
    const origenVisualMatch = descripcion.match(/\[origenVisualCalendario:([^\]]+)\]/);
    const origenVisualCalendario = origenVisualMatch ? decodeURIComponent(origenVisualMatch[1]) : '';
    descripcion = descripcion.replace(/\s*\[origenVisualCalendario:[^\]]+\]/, '').trim();
    const baseEdicionMatch = descripcion.match(/\[baseEdicionCalendario:([^\]]+)\]/);
    let baseEdicionCalendario = null;
    if (baseEdicionMatch) {
        try { baseEdicionCalendario = JSON.parse(decodeURIComponent(baseEdicionMatch[1])); } catch (error) { baseEdicionCalendario = null; }
        descripcion = descripcion.replace(/\s*\[baseEdicionCalendario:[^\]]+\]/, '').trim();
    }
    const baseRegistroMatch = descripcion.match(/\[baseEdicionRegistro:([^\]]+)\]/);
    let baseEdicionRegistro = null;
    if (baseRegistroMatch) {
        try { baseEdicionRegistro = JSON.parse(decodeURIComponent(baseRegistroMatch[1])); } catch (error) { baseEdicionRegistro = null; }
        descripcion = descripcion.replace(/\s*\[baseEdicionRegistro:[^\]]+\]/, '').trim();
    }

    const tarjetaMatchGeneral = descripcion.match(/\[tarjeta:([^\]]+)\]/);
    if (tarjetaMatchGeneral) {
        tarjetaDestinoId = decodeURIComponent(tarjetaMatchGeneral[1]);
        descripcion = descripcion.replace(/\s*\[tarjeta:[^\]]+\]/, '').trim();
    }
    const tarjetaNombreMatchGeneral = descripcion.match(/\[tarjetaNombre:([^\]]+)\]/);
    if (tarjetaNombreMatchGeneral) {
        tarjetaDestinoNombre = decodeURIComponent(tarjetaNombreMatchGeneral[1]);
        descripcion = descripcion.replace(/\s*\[tarjetaNombre:[^\]]+\]/, '').trim();
    }
    const origenTarjetaMatch = descripcion.match(/\[origenTarjeta:([^\]]+)\]/);
    if (origenTarjetaMatch) {
        origenTarjetaId = decodeURIComponent(origenTarjetaMatch[1]);
        descripcion = descripcion.replace(/\s*\[origenTarjeta:[^\]]+\]/, '').trim();
    }
    const origenNombreMatch = descripcion.match(/\[origenNombre:([^\]]+)\]/);
    if (origenNombreMatch) {
        origenTarjetaNombre = decodeURIComponent(origenNombreMatch[1]);
        descripcion = descripcion.replace(/\s*\[origenNombre:[^\]]+\]/, '').trim();
    }
    const abonosMatch = descripcion.match(/\[abonos:([^\]]+)\]/);
    if (abonosMatch) {
        try {
            abonos = JSON.parse(decodeURIComponent(abonosMatch[1]));
        } catch (error) {
            abonos = [];
        }
        descripcion = descripcion.replace(/\s*\[abonos:[^\]]+\]/, '').trim();
    }

    if (tipo === 'ganancia_semanal') {
        const diasMatch = descripcion.match(/\[dias:([\d,]+)\]/);
        if (diasMatch) {
            dias = diasMatch[1].split(',').map(Number);
            descripcion = descripcion.replace(/\s*\[dias:[\d,]+\]/, '').trim();
        }
        const estadoMatch = descripcion.match(/\[estado:(pagado|pendiente)\]/);
        if (estadoMatch) {
            estado = estadoMatch[1];
            descripcion = descripcion.replace(/\s*\[estado:(pagado|pendiente)\]/, '').trim();
        }
        const descripcionesMatch = descripcion.match(/\[descripciones:([^\]]+)\]/);
        if (descripcionesMatch) {
            try {
                descripcionesPorDia = JSON.parse(decodeURIComponent(descripcionesMatch[1]));
            } catch (error) {
                descripcionesPorDia = {};
            }
            descripcion = descripcion.replace(/\s*\[descripciones:[^\]]+\]/, '').trim();
        }
    }

    return {
        id: String(item.id),
        tipo,
        cliente: item.nombre || '',
        monto: Number(item.monto) || 0,
        descripcion: descripcion || 'Sin detalle',
        fechaHora: `${item.fecha}T${String(item.hora || '00:00').slice(0, 5)}`,
        dias: dias,
        estado: tipo === 'pendiente' || tipo === 'recibido' ? estado === 'pagado' ? 'pagado' : 'pendiente' : tipo === 'cobrado' ? 'pagado' : estado,
        descripcionesPorDia: descripcionesPorDia,
        tarjetaDestinoId: tarjetaDestinoId,
        tarjetaDestinoNombre: tarjetaDestinoNombre,
        enCalendario: enCalendario,
        ocultoCalendario: ocultoCalendario,
        eliminadoSinDevolver: eliminadoSinDevolver,
        fijadoContable: fijadoContable,
        modificadoCalendario: modificadoCalendario,
        modificadoRegistro: modificadoRegistro,
        montoVisualCalendario: Number.isFinite(montoVisualCalendario) ? montoVisualCalendario : null,
        origenVisualCalendario: origenVisualCalendario,
        baseEdicionCalendario: baseEdicionCalendario,
        baseEdicionRegistro: baseEdicionRegistro,
        destinoEfectivo: destinoEfectivo,
        origenTarjetaId: origenTarjetaId,
        origenTarjetaNombre: origenTarjetaNombre,
        origenEfectivo: origenEfectivo,
        comisionTarjeta: comisionTarjeta,
        abonos: Array.isArray(abonos) ? abonos : []
    };
}

function tarjetaDesdeSupabase(item) {
    const detalles = item.detalles || '';
    const retirosMatch = detalles.match(/\[retiros:([^\]]+)\]/);
    let retiros = [];
    if (retirosMatch) {
        try {
            retiros = JSON.parse(decodeURIComponent(retirosMatch[1]));
        } catch (error) {
            retiros = [];
        }
    }
    return {
        id: String(item.id),
        nombre: item.nombre || 'Tarjeta',
        monto: Number(item.monto) || 0,
        retiros: Array.isArray(retiros) ? retiros : []
    };
}

function esTarjetaSupabase(item) {
    return /\[tipo:tarjeta\]/.test(item.detalles || '');
}

function esPreferenciaVisibilidadSupabase(item) {
    return (item.detalles || '').includes(MARCADOR_PREFERENCIAS_VISIBILIDAD);
}

function preferenciasVisibilidadDesdeSupabase(item) {
    try {
        const datos = JSON.parse(item.nombre || '{}');
        return {
            id: String(item.id),
            totalGeneralOculto: Boolean(datos.totalGeneralOculto),
            totalTarjetasOculto: Boolean(datos.totalTarjetasOculto),
            efectivoOculto: Boolean(datos.efectivoOculto),
            tarjetasOcultas: Object.prototype.hasOwnProperty.call(datos, 'tarjetasOcultas') && datos.tarjetasOcultas && typeof datos.tarjetasOcultas === 'object' ? datos.tarjetasOcultas : null,
            contrasena: typeof datos.contrasena === 'string' && datos.contrasena ? datos.contrasena : null
        };
    } catch (error) {
        return null;
    }
}

async function guardarPreferenciasVisibilidad() {
    const datos = {
        nombre: JSON.stringify({ totalGeneralOculto, totalTarjetasOculto, efectivoOculto, tarjetasOcultas, contrasena: contrasenaActual }),
        fecha: new Date().toISOString().slice(0, 10),
        hora: new Date().toTimeString().slice(0, 5),
        monto: 0,
        detalles: MARCADOR_PREFERENCIAS_VISIBILIDAD
    };
    const consulta = idPreferenciasVisibilidad
        ? supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', idPreferenciasVisibilidad)
        : supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;
    if (error) {
        console.error('No se pudieron guardar las preferencias de visibilidad:', error.message);
        return;
    }
    if (data?.id) idPreferenciasVisibilidad = String(data.id);
}

async function cargarPreferenciasVisibilidad(data) {
    const preferencia = data.find(esPreferenciaVisibilidadSupabase);
    if (!preferencia) {
        await guardarPreferenciasVisibilidad();
        return;
    }

    const valores = preferenciasVisibilidadDesdeSupabase(preferencia);
    if (!valores) return;

    idPreferenciasVisibilidad = valores.id;
    totalGeneralOculto = valores.totalGeneralOculto;
    totalTarjetasOculto = valores.totalTarjetasOculto;
    efectivoOculto = valores.efectivoOculto;
    if (valores.tarjetasOcultas) {
        tarjetasOcultas = valores.tarjetasOcultas;
    } else {
        await guardarPreferenciasVisibilidad();
    }
    if (valores.contrasena) {
        contrasenaActual = valores.contrasena;
        localStorage.setItem('contrasena_cobros', contrasenaActual);
    }
    localStorage.setItem(CLAVE_TOTAL_GENERAL_OCULTO, String(totalGeneralOculto));
    localStorage.setItem(CLAVE_TOTAL_TARJETAS_OCULTO, String(totalTarjetasOculto));
    localStorage.setItem(CLAVE_EFECTIVO_OCULTO, String(efectivoOculto));
    localStorage.setItem('tarjetas_ocultas', JSON.stringify(tarjetasOcultas));
    renderTarjetas();
}

function claveTarjeta(tarjeta) {
    return JSON.stringify({
        nombre: tarjeta.nombre.trim().toLowerCase(),
        monto: Number(tarjeta.monto).toFixed(2),
        retiros: tarjeta.retiros || []
    });
}

function quitarTarjetasDuplicadas(lista) {
    const claves = new Set();
    const duplicadas = [];
    const unicas = lista.filter(tarjeta => {
        const clave = claveTarjeta(tarjeta);
        if (claves.has(clave)) {
            duplicadas.push(tarjeta);
            return false;
        }
        claves.add(clave);
        return true;
    });
    return { unicas, duplicadas };
}

async function eliminarDuplicadasDeSupabase(tarjetasDuplicadas) {
    await Promise.all(tarjetasDuplicadas.map(async tarjeta => {
        const { error } = await supabaseClient
            .from(TABLA_SUPABASE)
            .delete()
            .eq('id', tarjeta.id);
        if (error) {
            console.error('No se pudo eliminar una tarjeta duplicada:', error.message);
        }
    }));
}

async function cargarRegistrosDesdeSupabase() {
    const { data, error } = await supabaseClient
        .from(TABLA_SUPABASE)
        .select('id, nombre, fecha, hora, monto, detalles')
        .order('fecha', { ascending: false });

    if (error) {
        console.error('No se pudieron cargar los registros desde Supabase:', error.message);
        return;
    }

    const tarjetasCargadas = data.filter(esTarjetaSupabase).map(tarjetaDesdeSupabase);
    const resultadoTarjetas = quitarTarjetasDuplicadas(tarjetasCargadas);
    const tarjetasNube = resultadoTarjetas.unicas;
    await eliminarDuplicadasDeSupabase(resultadoTarjetas.duplicadas);
    const todosLosRegistros = data.filter(item => !esTarjetaSupabase(item) && !esPreferenciaVisibilidadSupabase(item)).map(registroDesdeSupabase);
    tarjetas = tarjetasNube;
    
    // Separar ganancias semanales de los registros normales
    retirosEfectivo = todosLosRegistros.filter(r => r.tipo === 'retiro_efectivo');
    gastosMios = todosLosRegistros.filter(r => r.tipo === 'gasto_mio' || r.tipo === 'gasto_casa');
    registros = todosLosRegistros.filter(r => r.tipo !== 'ganancia_semanal' && r.tipo !== 'retiro_efectivo' && r.tipo !== 'gasto_mio' && r.tipo !== 'gasto_casa');
    gananciasSemanales = todosLosRegistros.filter(r => r.tipo === 'ganancia_semanal');
    normalizarBasesEdicion();
    
    localStorage.setItem('registros_cobros', JSON.stringify(registros));
    localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
    localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
    localStorage.setItem('gastos_mios', JSON.stringify(gastosMios));
    actualizarInterfaz();
}

// Integrar la función para cargar automáticamente los datos de Supabase al abrir la aplicación
async function cargarDatosDesdeSupabase() {
  if (typeof supabaseClient === 'undefined' || !supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from(TABLA_SUPABASE)
      .select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error);
      return;
    }

    await cargarPreferenciasVisibilidad(data || []);

    const hayTarjetasEnNube = (data || []).some(esTarjetaSupabase);
    const hayMovimientosEnNube = (data || []).some(item => !esTarjetaSupabase(item) && !esPreferenciaVisibilidadSupabase(item));
    if (!hayTarjetasEnNube && !hayMovimientosEnNube) {
        actualizarInterfaz();
        actualizarVisibilidadTotales();
        return;
    }

    if (data && data.length > 0) {
      // Parsear los datos usando la función existente para mantener consistencia
            const tarjetasCargadas = data.filter(esTarjetaSupabase).map(tarjetaDesdeSupabase);
            const resultadoTarjetas = quitarTarjetasDuplicadas(tarjetasCargadas);
            const tarjetasNube = resultadoTarjetas.unicas;
            await eliminarDuplicadasDeSupabase(resultadoTarjetas.duplicadas);
            tarjetas = tarjetasNube;
            localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));

            const todosLosRegistros = data.filter(item => !esTarjetaSupabase(item) && !esPreferenciaVisibilidadSupabase(item)).map(registroDesdeSupabase);

      // Separar ganancias semanales de los registros normales
    retirosEfectivo = todosLosRegistros.filter(r => r.tipo === 'retiro_efectivo');
    gastosMios = todosLosRegistros.filter(r => r.tipo === 'gasto_mio' || r.tipo === 'gasto_casa');
    registros = todosLosRegistros.filter(r => r.tipo !== 'ganancia_semanal' && r.tipo !== 'retiro_efectivo' && r.tipo !== 'gasto_mio' && r.tipo !== 'gasto_casa');
      gananciasSemanales = todosLosRegistros.filter(r => r.tipo === 'ganancia_semanal');
    normalizarBasesEdicion();

      localStorage.setItem('registros_cobros', JSON.stringify(registros));
      localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
    localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
    localStorage.setItem('gastos_mios', JSON.stringify(gastosMios));

      // Actualizar la interfaz de usuario con los datos de la nube
      if (typeof actualizarInterfaz === 'function') actualizarInterfaz();
        } else if (tarjetas.length > 0) {
            const resultadoLocales = quitarTarjetasDuplicadas(tarjetas);
            tarjetas = resultadoLocales.unicas;
            localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
            await sincronizarTarjetasConSupabase();
            actualizarInterfaz();
    }
        actualizarVisibilidadTotales();
  } catch (err) {
    console.error('Excepción al sincronizar con Supabase:', err);
  }
}

async function guardarRegistroEnSupabase(item) {
    const { fecha, hora } = separarFechaHora(item.fechaHora);
    const datos = {
        nombre: item.cliente,
        fecha,
        hora,
        monto: item.monto,
        detalles: detallesParaSupabase(item)
    };

    const consulta = item.id ?
        supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', item.id) :
        supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;

    if (error) {
        console.error('No se pudo guardar el registro en Supabase:', error.message);
        return null;
    }

    return item.id || String(data.id);
}

function resetFormulario() {
    form.reset();
    actualizarCamposFormulario();
    registroIdInput.value = '';
    document.getElementById('form-title').innerHTML = '<i class="fa-solid fa-circle-plus"></i> Registrar Nuevo Movimiento';
    btnGuardar.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Registro';
    btnCancelar.style.display = 'none';
    setFechaActual();
}

btnCancelar.addEventListener('click', resetFormulario);

function actualizarInterfaz() {
    renderTarjetas();
    renderResumenHistorialEfectivo();
    renderResumenHistorialTarjetas();
    renderResumenHistorialGastos();
    renderResumenHistorialGastosCasa();
    renderTablas();
    renderGananciasSemanales();
    calcularTotales();
}

function renderTablas() {
    const tablaPendientes = document.getElementById('tabla-pendientes');
    const tablaCobrados = document.getElementById('tabla-cobrados');
    const tablaPrestado = document.getElementById('tabla-prestado');
    const tablaRecibido = document.getElementById('tabla-recibido');
    const tablaRecibidoPagado = document.getElementById('tabla-recibido-pagado');
    const tablaDeudasPendientes = document.getElementById('tabla-deudas-pendientes');
    const tablaDeudasPagadas = document.getElementById('tabla-deudas-pagadas');

    tablaPendientes.innerHTML = '';
    tablaCobrados.innerHTML = '';
    tablaPrestado.innerHTML = '';
    tablaRecibido.innerHTML = '';
    tablaRecibidoPagado.innerHTML = '';
    tablaDeudasPendientes.innerHTML = '';
    tablaDeudasPagadas.innerHTML = '';

    const pendientes = [
        ...registros.filter(r => r.tipo === 'pendiente'),
        ...gananciasSemanales.filter(r => r.estado === 'pendiente')
    ];
    const cobrados = [
        ...registros.filter(r => r.tipo === 'cobrado'),
        ...gananciasSemanales.filter(r => r.estado === 'pagado')
    ];
    const prestado = registros.filter(r => r.tipo === 'prestado');
    const recibido = registros.filter(r => r.tipo === 'recibido');
    const recibidoPagado = registros.filter(r => r.tipo === 'recibido' && r.estado === 'pagado');
    const deudasPendientes = registros.filter(r => r.tipo === 'deuda' && obtenerSaldoDeuda(r) > 0.009);
    const deudasPagadas = registros.filter(r => r.tipo === 'deuda' && obtenerSaldoDeuda(r) <= 0.009);

    renderTabla(tablaPendientes, pendientes, 'No hay cobros pendientes registrados.');
    renderTabla(tablaCobrados, cobrados, 'No hay cobros realizados registrados.');
    renderTabla(tablaPrestado, prestado, 'No hay dinero prestado registrado.');
    renderTabla(tablaRecibido, recibido, 'No hay dinero recibido en préstamo registrado.');
    renderTabla(tablaRecibidoPagado, recibidoPagado, 'No hay deudas recibidas pagadas.');
    renderTabla(tablaDeudasPendientes, deudasPendientes, 'No hay deudas pendientes registradas.');
    renderTabla(tablaDeudasPagadas, deudasPagadas, 'No hay deudas pagadas registradas.');
}

function ordenarPorFecha(items) {
    return [...items].sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
}

function renderTabla(tabla, items, mensajeVacio, mostrarTodos = false) {
    const itemsOrdenados = ordenarPorFecha(items);
    const itemsVisibles = mostrarTodos ? itemsOrdenados : itemsOrdenados.slice(0, 3);

    if (items.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="empty-text">${mensajeVacio}</td></tr>`;
        return;
    }

    itemsVisibles.forEach(item => {
        tabla.appendChild(crearFila(item));
    });
}

function crearGrupoOtrosMovimientos(titulo, icono, items, crearContenido, clave) {
        const grupo = document.createElement('section');
        grupo.className = 'otros-movimientos-grupo';
        grupo.dataset.historialGrupo = clave;
        grupo.innerHTML = `<div class="otros-movimientos-encabezado"><h3><i class="fa-solid ${icono}"></i> ${titulo}</h3><button type="button" class="btn btn-history btn-history-small btn-ver-mas-otros">Ver más</button></div>`;
        const lista = document.createElement('div');
        lista.className = 'otros-movimientos-items';
        const elementos = ordenarPorFecha(items);
        if (items.length === 0) {
            lista.innerHTML = '<p class="historial-vacio">No hay registros.</p>';
        } else {
            elementos.forEach((item, indice) => {
                const contenido = crearContenido(item);
                if (indice >= 3) contenido.hidden = true;
                lista.appendChild(contenido);
            });
        }
        const boton = grupo.querySelector('.btn-ver-mas-otros');
        boton.hidden = items.length <= 3;
        boton.addEventListener('click', () => abrirHistorialGrupo(titulo, icono, items, crearContenido));
        grupo.appendChild(lista);
        return grupo;
}

function abrirHistorialGrupo(titulo, icono, items, crearContenido, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialGrupo(titulo, icono, items, crearContenido, true));
        return;
    }
    document.getElementById('titulo-historial-grupo').innerHTML = `<i class="fa-solid ${icono}"></i> Historial de ${titulo.toLowerCase()}`;
    listaHistorialGrupo.innerHTML = '';
    btnVerMasHistorialGrupo.hidden = true;
    ordenarPorFecha(items).forEach(item => listaHistorialGrupo.appendChild(crearContenido(item)));
    modalHistorialGrupo.hidden = false;
    modalHistorialGrupo.style.display = 'flex';
}

function cerrarHistorialGrupo() {
    modalHistorialGrupo.hidden = true;
    modalHistorialGrupo.style.display = 'none';
}

function abrirHistorialSeccion(titulo, items, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialSeccion(titulo, items, true));
        return;
    }
    historialGrupoItems = ordenarPorFecha(items);
    historialGrupoCrearContenido = crearContenidoMovimientoEditable;
    document.getElementById('titulo-historial-grupo').innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> ${titulo}`;
    listaHistorialGrupo.innerHTML = '';
    historialGrupoItems.forEach((item, indice) => {
        const contenido = historialGrupoCrearContenido(item);
        contenido.hidden = indice >= 3;
        listaHistorialGrupo.appendChild(contenido);
    });
    btnVerMasHistorialGrupo.hidden = historialGrupoItems.length <= 3;
    btnVerMasHistorialGrupo.textContent = 'Ver más';
    btnVerMasHistorialGrupo.dataset.expandido = 'false';
    modalHistorialGrupo.hidden = false;
    modalHistorialGrupo.style.display = 'flex';
}

function crearContenidoMovimientoEditable(item) {
    const fila = document.createElement('div');
    fila.className = 'otro-movimiento-item';
    fila.dataset.registroId = item.id;
    fila.innerHTML = `<div><strong>${escaparHtml(item.cliente)} ${etiquetaModificacion(item)}</strong><span>$${Number(item.monto).toFixed(2)} · ${escaparHtml(item.descripcion)}</span><small>${new Date(item.fechaHora).toLocaleString('es-EC')}</small><span class="estados-valor-comision">${etiquetaCampoEdicion(item, 'monto', 'Valor')} ${etiquetaCampoEdicion(item, 'comision', 'Comisión')}</span></div><div class="otro-movimiento-acciones"><button type="button" class="btn-retiro-editar btn-editar-otro-registro" title="Editar"><i class="fa-solid fa-pen"></i></button><button type="button" class="btn-retiro-eliminar btn-eliminar-otro-registro" title="Eliminar"><i class="fa-solid fa-xmark"></i></button></div>`;
    return fila;
}

function abrirOtrosMovimientos(autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirOtrosMovimientos(true));
        return;
    }
        listaOtrosMovimientos.innerHTML = '';
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Cobros realizados', 'fa-circle-check', registros.filter(item => item.tipo === 'cobrado'), crearContenidoMovimientoEditable, 'cobrados'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Cobros pendientes', 'fa-clock', registros.filter(item => item.tipo === 'pendiente'), crearContenidoMovimientoEditable, 'pendientes'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Dinero prestado y recibido', 'fa-hand-holding-dollar', registros.filter(item => item.tipo === 'prestado' || item.tipo === 'recibido'), crearContenidoMovimientoEditable, 'prestamos'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Deudas', 'fa-file-invoice-dollar', registros.filter(item => item.tipo === 'deuda'), crearContenidoMovimientoEditable, 'deudas'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Retiros en efectivo', 'fa-money-bill-wave', retirosEfectivo.filter(item => !item.eliminadoSinDevolver), item => {
            const fila = document.createElement('div');
            fila.innerHTML = crearHtmlRetiroEfectivo(item);
            return fila.firstElementChild;
        }, 'efectivo'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Retiros por tarjeta', 'fa-credit-card', obtenerRetirosTarjetas(), item => {
            const fila = document.createElement('div');
            fila.innerHTML = crearHtmlRetiroTarjeta(item);
            return fila.firstElementChild;
        }, 'tarjetas'));
        listaOtrosMovimientos.appendChild(crearGrupoOtrosMovimientos('Gastos míos', 'fa-bag-shopping', gastosMios.filter(item => !item.eliminadoSinDevolver), item => {
            const fila = document.createElement('div');
            fila.innerHTML = crearHtmlGasto(item);
            return fila.firstElementChild;
        }, 'gastos'));
        document.getElementById('titulo-historial-registros').innerHTML = '<i class="fa-solid fa-list"></i> Otros movimientos';
        tablaHistorialRegistros.closest('.table-responsive').hidden = true;
        listaOtrosMovimientos.hidden = false;
        modalHistorialRegistros.hidden = false;
        modalHistorialRegistros.style.display = 'flex';
}

const datosHistorialSecciones = {
    pendientes: {
        titulo: 'Pendientes de Pago (Deudas)',
        mensaje: 'No hay cobros pendientes registrados.',
        obtener: () => [...registros.filter(r => r.tipo === 'pendiente'), ...gananciasSemanales.filter(r => r.estado === 'pendiente')]
    },
    cobrados: {
        titulo: 'Historial de Cobros Realizados',
        mensaje: 'No hay cobros realizados registrados.',
        obtener: () => [...registros.filter(r => r.tipo === 'cobrado' && !r.eliminadoSinDevolver), ...gananciasSemanales.filter(r => r.estado === 'pagado' && !r.eliminadoSinDevolver)]
    },
    'deudas-pendientes': {
        titulo: 'Deudas pendientes',
        mensaje: 'No hay deudas pendientes registradas.',
        obtener: () => registros.filter(r => r.tipo === 'deuda' && obtenerSaldoDeuda(r) > 0.009)
    },
    'deudas-pagadas': {
        titulo: 'Historial de deudas pagadas',
        mensaje: 'No hay deudas pagadas registradas.',
        obtener: () => registros.filter(r => r.tipo === 'deuda' && obtenerSaldoDeuda(r) <= 0.009)
    },
    prestado: {
        titulo: 'Dinero que Presté',
        mensaje: 'No hay dinero prestado registrado.',
        obtener: () => registros.filter(r => r.tipo === 'prestado')
    },
    recibido: {
        titulo: 'Dinero que me Prestaron',
        mensaje: 'No hay dinero recibido en préstamo registrado.',
        obtener: () => registros.filter(r => r.tipo === 'recibido')
    }
    ,
    'recibido-pagado': {
        titulo: 'Deudas recibidas pagadas',
        mensaje: 'No hay deudas recibidas pagadas.',
        obtener: () => registros.filter(r => r.tipo === 'recibido' && r.estado === 'pagado')
    }
};

function abrirHistorialRegistros(seccion, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => abrirHistorialRegistros(seccion, true));
        return;
    }
    const datos = datosHistorialSecciones[seccion];
    if (!datos) return;
    abrirHistorialSeccion(datos.titulo, datos.obtener(), true);
}

if (btnVerOtrosMovimientos) btnVerOtrosMovimientos.addEventListener('click', () => abrirOtrosMovimientos());
btnCerrarHistorialGrupo.addEventListener('click', cerrarHistorialGrupo);
btnVerMasHistorialGrupo.addEventListener('click', () => {
    const mostrarTodo = btnVerMasHistorialGrupo.dataset.expandido !== 'true';
    listaHistorialGrupo.querySelectorAll('[data-registro-id]').forEach((item, indice) => {
        if (indice >= 3) item.hidden = !mostrarTodo;
    });
    btnVerMasHistorialGrupo.dataset.expandido = String(mostrarTodo);
    btnVerMasHistorialGrupo.textContent = mostrarTodo ? 'Ver menos' : 'Ver más';
});
modalHistorialGrupo.addEventListener('click', event => {
    if (event.target === modalHistorialGrupo) cerrarHistorialGrupo();
});

function cerrarHistorialRegistros() {
    modalHistorialRegistros.hidden = true;
    modalHistorialRegistros.style.display = 'none';
}

botonesHistorialSeccion.forEach(boton => {
    boton.addEventListener('click', () => abrirHistorialRegistros(boton.dataset.historialSeccion));
});
btnCerrarHistorialRegistros.addEventListener('click', cerrarHistorialRegistros);
modalHistorialRegistros.addEventListener('click', event => {
    if (event.target === modalHistorialRegistros) cerrarHistorialRegistros();
});

function crearFila(item) {
    const tr = document.createElement('tr');
    const fechaFormateada = new Date(item.fechaHora).toLocaleString('es-EC', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const esGananciaSemanal = item.tipo === 'ganancia_semanal';
    const esPendiente = item.tipo === 'pendiente' || (esGananciaSemanal && item.estado === 'pendiente');
    const esPrestamoPendiente = item.tipo === 'prestado' && item.estado !== 'pagado';
    const esRecibidoPendiente = item.tipo === 'recibido' && item.estado !== 'pagado';
    const esDeudaPendiente = item.tipo === 'deuda' && obtenerSaldoDeuda(item) > 0.009;
    const totalAbonado = item.tipo === 'deuda' ? obtenerTotalAbonado(item) : 0;
    const saldoDeuda = item.tipo === 'deuda' ? obtenerSaldoDeuda(item) : 0;
    const colorMonto = esPendiente || esDeudaPendiente ? '#ef4444' : item.tipo === 'prestado' ? '#f59e0b' : '#10b981';
    const textoDestino = item.tipo === 'recibido' || item.tipo === 'prestado'
        ? (item.origenTarjetaId || item.origenEfectivo ? 'Cambiar origen' : 'Retirar de tarjeta')
        : (item.tarjetaDestinoId || item.destinoEfectivo ? 'Cambiar destino' : 'Mandar a tarjeta');
    const estadoPrestamo = item.tipo === 'prestado'
        ? `<span class="estado-prestamo ${item.estado === 'pagado' ? 'pagado' : 'pendiente'}">${item.estado === 'pagado' ? '✅ Pagado' : '⏳ Deuda pendiente'}</span>`
        : '';
    const deudaPagada = item.tipo === 'deuda' && obtenerSaldoDeuda(item) <= 0.009;
    const estadoDeuda = item.tipo === 'deuda'
        ? `<span class="estado-prestamo ${deudaPagada ? 'pagado' : 'pendiente'}">${deudaPagada ? '✅ Pagada' : '⏳ Pendiente'}</span>`
        : '';
    const resumenDeuda = item.tipo === 'deuda'
        ? `<div class="resumen-deuda"><span>Total: $${Number(item.monto).toFixed(2)}</span><span>Abonado: $${totalAbonado.toFixed(2)}</span><span>Falta: $${saldoDeuda.toFixed(2)}</span></div>`
        : '';
    const montoMostrado = item.tipo === 'deuda' ? saldoDeuda : Number(item.monto);
    const estadoRecibido = item.tipo === 'recibido'
        ? `<span class="estado-prestamo ${item.estado === 'pagado' ? 'pagado' : 'pendiente'}">${item.estado === 'pagado' ? '✅ Pagada' : '⏳ Deuda pendiente'}</span>`
        : '';

    tr.innerHTML = `
    <td><strong>${escaparHtml(item.cliente)} ${etiquetaModificacion(item)}</strong></td>
    <td style="color: ${colorMonto}; font-weight: 700;">$${montoMostrado.toFixed(2)}</td>
    <td>${escaparHtml(item.descripcion)}${estadoPrestamo}${estadoDeuda}${estadoRecibido}${resumenDeuda}<div class="estados-valor-comision">${etiquetaCampoEdicion(item, 'monto', 'Valor')} ${etiquetaCampoEdicion(item, 'comision', 'Comisión')}</div></td>
    <td>${fechaFormateada}</td>
    <td>
      <div class="action-buttons">
                ${esPendiente ? `<button class="btn btn-pay" onclick="${esGananciaSemanal ? `marcarGananciaComoPagada('${item.id}')` : `marcarComoCobrado('${item.id}')`}" title="Marcar como pagado"><i class="fa-solid fa-check"></i> Cobrar</button>` : ''}
                ${esPrestamoPendiente ? `<button class="btn btn-pay" onclick="marcarPrestamoComoPagado('${item.id}')" title="Pagar deuda"><i class="fa-solid fa-check"></i> Pagar deuda</button>` : ''}
                ${esRecibidoPendiente ? `<button class="btn btn-pay" onclick="marcarRecibidoComoPagado('${item.id}')" title="Cobrar deuda"><i class="fa-solid fa-check"></i> Cobrar deuda</button>` : ''}
                ${item.tipo === 'recibido' && item.estado === 'pagado' ? '<span class="estado-prestamo pagado">✅ Pagada</span>' : ''}
                ${esDeudaPendiente ? `<button class="btn btn-pay" onclick="marcarDeudaComoPagada('${item.id}')" title="Pagar deuda"><i class="fa-solid fa-file-invoice-dollar"></i> Pagar deuda</button>` : ''}
                ${esDeudaPendiente ? `<button class="btn btn-destino" onclick="abrirModalAbonoDeuda('${item.id}')" title="Abonar una parte"><i class="fa-solid fa-coins"></i> Abonar</button>` : ''}
                ${item.tipo === 'deuda' && deudaPagada ? `<button class="btn btn-destino" onclick="cambiarPagoDeuda('${item.id}')" title="Cambiar método de pago"><i class="fa-solid fa-arrows-rotate"></i> Cambiar pago</button>` : ''}
            <button class="btn btn-edit" onclick="editarRegistroEnTabla('${item.id}', this)" title="Editar registro aquí"><i class="fa-solid fa-pen"></i></button>
        ${item.tipo !== 'deuda' ? `<button class="btn btn-destino" onclick="abrirEditarDestinoCalendario('${item.id}', ${!esGananciaSemanal})" title="${textoDestino}"><i class="fa-solid fa-wallet"></i></button>` : ''}
            <button class="btn btn-delete" onclick="${esGananciaSemanal ? `eliminarGananciaSemanal('${item.id}')` : `eliminarRegistro('${item.id}')`}" title="Eliminar registro"><i class="fa-solid fa-trash"></i></button>
      </div>
    </td>
  `;
    return tr;
}

window.editarRegistroEnTabla = function(id, boton, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.editarRegistroEnTabla(id, boton, true));
        return;
    }
    const item = [...registros, ...gananciasSemanales, ...retirosEfectivo].find(registro => registro.id === id);
    if (!item) return;

    const filaActual = boton.closest('tr');
    const elementoActual = filaActual || boton.closest('.ganancia-item');
    if (!elementoActual) return;

    const editorExistente = elementoActual.nextElementSibling;
    if (editorExistente?.classList.contains('fila-editor-registro')) {
        editorExistente.remove();
        return;
    }

    document.querySelectorAll('.fila-editor-registro').forEach(fila => fila.remove());

    const filaEditor = document.createElement(filaActual ? 'tr' : 'div');
    filaEditor.className = filaActual ? 'fila-editor-registro' : 'editor-registro-calendario';
    const contenidoEditor = `
            <div class="editor-registro-inline">
                <div class="editor-registro-campo">
                    <label>Persona / concepto</label>
                    <input type="text" class="editor-cliente" value="${escaparHtml(item.cliente || '')}">
                </div>
                <div class="editor-registro-campo">
                    <label>Monto ($)</label>
                    <input type="number" class="editor-monto" min="0" step="0.01" value="${Number(item.monto || 0).toFixed(2)}">
                </div>
                <div class="editor-registro-campo">
                    <label>Comisión ($)</label>
                    <input type="number" class="editor-comision" min="0" step="0.01" value="${Number(item.comisionTarjeta ?? item.comision) || 0}">
                </div>
                <div class="editor-registro-campo editor-registro-descripcion">
                    <label>Descripción</label>
                    <input type="text" class="editor-descripcion" value="${escaparHtml(item.descripcion || '')}">
                </div>
                <div class="editor-registro-campo">
                    <label>Fecha y hora</label>
                    <input type="datetime-local" class="editor-fecha" value="${escaparHtml(item.fechaHora || '')}">
                </div>
                <div class="editor-registro-acciones">
                    <button type="button" class="btn btn-cancel btn-cancelar-editor"><i class="fa-solid fa-xmark"></i> Cancelar</button>
                    <button type="button" class="btn btn-save btn-guardar-editor"><i class="fa-solid fa-check"></i> Guardar</button>
                </div>
            </div>
    `;
    filaEditor.innerHTML = filaActual ? `<td colspan="5">${contenidoEditor}</td>` : contenidoEditor;

    elementoActual.after(filaEditor);
    filaEditor.querySelector('.editor-cliente').focus();
    filaEditor.querySelector('.btn-cancelar-editor').addEventListener('click', () => filaEditor.remove());
    filaEditor.querySelector('.btn-guardar-editor').addEventListener('click', async () => {
        const cliente = filaEditor.querySelector('.editor-cliente').value.trim();
        const monto = Number(filaEditor.querySelector('.editor-monto').value);
        const comision = Number(filaEditor.querySelector('.editor-comision').value) || 0;
        const descripcion = filaEditor.querySelector('.editor-descripcion').value.trim() || 'Sin detalle';
        const fechaHora = filaEditor.querySelector('.editor-fecha').value;

        if (!cliente || !Number.isFinite(monto) || monto < 0 || !Number.isFinite(comision) || comision < 0 || !fechaHora) {
            filaEditor.classList.add('editor-registro-invalido');
            return;
        }

        item.cliente = cliente;
        item.monto = monto;
        item.comisionTarjeta = comision;
        item.descripcion = descripcion;
        item.fechaHora = fechaHora;
        actualizarEstadoEdicionRegistro(item);
        reconciliarSaldoRegistroEditado(item);
        await guardarRegistroEnSupabase(item);
        guardarYActualizar();
    });
};

function escaparHtml(valor) {
    return String(valor).replace(/[&<>'"]/g, caracter => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    })[caracter]);
}

function marcarComoCobrado(id) {
    const item = registros.find(r => r.id === id);
    if (item) {
        registroPendienteDePago = {
            registro: item,
            tipo: item.tipo,
            fechaHora: item.fechaHora,
            estado: item.estado
        };
        item.tipo = 'cobrado';
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        item.fechaHora = now.toISOString().slice(0, 16);
        
        registroPendienteDeGuardar = item;
        mostrarModalSeleccionarTarjeta();
    }
}


function cargarParaEditar(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => cargarParaEditar(id, true));
        return;
    }
    const item = registros.find(r => r.id === id);
    if (item) {
        registroIdInput.value = item.id;
        tipoInput.value = item.tipo;
        clienteInput.value = item.cliente;
        montoInput.value = item.monto;
        comisionGastoInput.value = Number(item.comisionTarjeta) || 0;
        comisionCobroInput.value = Number(item.comisionTarjeta) || 0;
        descripcionInput.value = item.descripcion;
        fechaHoraInput.value = item.fechaHora;
        actualizarCamposFormulario();

        document.getElementById('form-title').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Registro';
        btnGuardar.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Actualizar Registro';
        btnCancelar.style.display = 'inline-flex';
    }
}

function eliminarRegistro(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadEliminacion(() => eliminarRegistro(id, true));
        return;
    }
    const retiroEfectivo = retirosEfectivo.find(retiro => retiro.id === id);
    if (retiroEfectivo) {
        eliminarRetiroEfectivo(id, true);
        return;
    }
    registroPendienteDeEliminar = id;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    modalTituloEliminacion.textContent = '¿Estás seguro de que quieres eliminar este registro?';
    modalMensajeEliminacion.textContent = 'Esta acción no se puede deshacer.';
    abrirModalEliminar();
    btnCancelarEliminacion.focus();
}

function abrirModalEliminar() {
    eliminacionEnCurso = false;
    devolverDineroAlEliminar = false;
    btnConfirmarEliminacion.hidden = false;
    const movimiento = gastoPendienteDeEliminar || retiroPendienteDeEliminar?.retiro || registroPendienteDeEliminar && registros.find(item => item.id === registroPendienteDeEliminar) || gananciaPendienteDeEliminar;
    const necesitaDevolucion = Boolean(
        gastoPendienteDeEliminar ||
        retiroPendienteDeEliminar ||
        movimiento?.origenEfectivo ||
        movimiento?.origenTarjetaId ||
        movimiento?.destinoEfectivo ||
        movimiento?.tarjetaDestinoId
    );
    btnConfirmarEliminacionDevolver.hidden = !necesitaDevolucion;
    modalEliminar.hidden = false;
}

function cerrarModalEliminar() {
    eliminacionEnCurso = false;
    modalEliminar.hidden = true;
    registroPendienteDeEliminar = null;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    gastoPendienteDeEliminar = null;
    gananciaPendienteDeEliminar = null;
    devolverDineroAlEliminar = false;
    modalTituloEliminacion.textContent = '¿Estás seguro de que quieres eliminar este registro?';
    modalMensajeEliminacion.textContent = 'Esta acción no se puede deshacer.';
}

async function confirmarEliminacion() {
    if (eliminacionEnCurso) return;
    if (!gastoPendienteDeEliminar && !gananciaPendienteDeEliminar && !retiroPendienteDeEliminar && !tarjetaPendienteDeEliminar && !registroPendienteDeEliminar) return;
    eliminacionEnCurso = true;
    btnConfirmarEliminacion.disabled = true;
    btnConfirmarEliminacionDevolver.disabled = true;

    if (gastoPendienteDeEliminar) {
        const gasto = gastoPendienteDeEliminar;
        if (!devolverDineroAlEliminar && gasto.origenEfectivo) {
            gasto.eliminadoSinDevolver = true;
            await guardarRegistroEnSupabase(gasto);
            guardarYActualizar();
            cerrarModalEliminar();
            return;
        }
        if (devolverDineroAlEliminar) devolverMontoGastoAlOrigen(gasto);
        gastosMios = gastosMios.filter(item => item.id !== gasto.id);
        guardarYActualizar();
        if (devolverDineroAlEliminar) await guardarTarjetas();
        await eliminarRegistroDeSupabase(gasto.id);
        cerrarModalEliminar();
        return;
    }

    if (gananciaPendienteDeEliminar) {
        const ganancia = gananciaPendienteDeEliminar;
        const id = ganancia.id;
        if (!devolverDineroAlEliminar && (ganancia.destinoEfectivo || ganancia.tarjetaDestinoId)) {
            ganancia.eliminadoSinDevolver = true;
            await guardarRegistroEnSupabase(ganancia);
            guardarYActualizar();
            cerrarModalEliminar();
            return;
        }
        if (devolverDineroAlEliminar && ganancia.tarjetaDestinoId) {
            const tarjeta = tarjetas.find(item => item.id === ganancia.tarjetaDestinoId);
            if (tarjeta) {
                tarjeta.monto -= Math.max(0, (Number(ganancia.monto) || 0) - (Number(ganancia.comisionTarjeta) || 0));
                await guardarTarjetas();
            }
        }
        gananciasSemanales = gananciasSemanales.filter(ganancia => ganancia.id !== id);
        localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
        renderGananciasSemanales();
        eliminarRegistroDeSupabase(id);
        cerrarModalEliminar();
        return;
    }

    if (retiroPendienteDeEliminar) {
        if (retiroPendienteDeEliminar.efectivo) {
            const retiro = retiroPendienteDeEliminar.retiro;
            if (!devolverDineroAlEliminar) {
                retiro.eliminadoSinDevolver = true;
                await guardarRegistroEnSupabase(retiro);
                guardarYActualizar();
                cerrarModalEliminar();
                if (!modalRetiroEfectivo.hidden) abrirModalRetiroEfectivo();
                return;
            }
            const id = retiro.id;
            retirosEfectivo = retirosEfectivo.filter(retiro => retiro.id !== id);
            localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
            guardarYActualizar();
            await eliminarRegistroDeSupabase(id);
            cerrarModalEliminar();
            if (!modalRetiroEfectivo.hidden) abrirModalRetiroEfectivo();
            return;
        }
        const { tarjeta, retiro } = retiroPendienteDeEliminar;
        if (devolverDineroAlEliminar) tarjeta.monto += Number(retiro.monto) + (Number(retiro.comision) || 0);
        tarjeta.retiros = tarjeta.retiros.filter(item => item.id !== retiro.id);
        await guardarTarjetas();
        renderTarjetas();
        renderDetalleTarjeta();
        renderResumenHistorialTarjetas();
        if (!modalHistorialRetirosTarjetas.hidden) abrirHistorialRetirosTarjetas();
        cerrarModalEliminar();
        return;
    }

    if (tarjetaPendienteDeEliminar) {
        const id = tarjetaPendienteDeEliminar.id;
        tarjetas = tarjetas.filter(t => t.id !== id);
        delete tarjetasOcultas[String(id)];
        localStorage.setItem('tarjetas_ocultas', JSON.stringify(tarjetasOcultas));
        await guardarTarjetas();
        await guardarPreferenciasVisibilidad();
        await eliminarTarjetaDeSupabase(id);
        renderTarjetas();
        cerrarModalEliminar();
        return;
    }

    if (!registroPendienteDeEliminar) {
        return;
    }

    const id = registroPendienteDeEliminar;
    const registro = registros.find(item => item.id === id);
    if (registro && !devolverDineroAlEliminar && (registro.origenEfectivo || registro.destinoEfectivo)) {
        registro.eliminadoSinDevolver = true;
        await guardarRegistroEnSupabase(registro);
        guardarYActualizar();
        cerrarModalEliminar();
        return;
    }
    if (registro && devolverDineroAlEliminar && (registro.origenTarjetaId || registro.tarjetaDestinoId)) {
        const montoRegistro = Number(registro.monto) || 0;
        const comisionRegistro = Number(registro.comisionTarjeta) || 0;
        const tarjetaOrigen = tarjetas.find(item => item.id === registro.origenTarjetaId);
        const tarjetaDestino = tarjetas.find(item => item.id === registro.tarjetaDestinoId);
        if (tarjetaOrigen) tarjetaOrigen.monto += montoRegistro + comisionRegistro;
        if (tarjetaDestino) tarjetaDestino.monto -= Math.max(0, montoRegistro - comisionRegistro);
        await guardarTarjetas();
    }
    registros = registros.filter(r => r.id !== id);
    guardarYActualizar();
    eliminarRegistroDeSupabase(id);
    cerrarModalEliminar();
}

async function eliminarRegistroDeSupabase(id) {
    const { error } = await supabaseClient.from(TABLA_SUPABASE).delete().eq('id', id);
    if (error) {
        console.error('No se pudo eliminar el registro de Supabase:', error.message);
    }
}

btnCerrarModal.addEventListener('click', cerrarModalEliminar);
btnCancelarEliminacion.addEventListener('click', cerrarModalEliminar);
btnConfirmarEliminacion.addEventListener('click', () => {
    devolverDineroAlEliminar = false;
    confirmarEliminacion();
});
btnConfirmarEliminacionDevolver.addEventListener('click', () => {
    devolverDineroAlEliminar = true;
    confirmarEliminacion();
});

modalEliminar.addEventListener('click', function(e) {
    if (e.target === modalEliminar) {
        cerrarModalEliminar();
    }
});

function calcularTotales() {
    const ahora = new Date();
    const diasDesdeLunes = (ahora.getDay() + 6) % 7;
    const inicioSemana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() - diasDesdeLunes);
    const finSemana = new Date(inicioSemana.getFullYear(), inicioSemana.getMonth(), inicioSemana.getDate() + 7);

    let totalDiario = 0;
    let totalSemanal = 0;
    let totalMensual = 0;
    let totalPendiente = 0;
    let totalPrestado = 0;
    let totalRecibido = 0;
    let totalMontoGeneral = 0;

        registros.forEach(item => {
        const fechaItem = new Date(item.fechaHora);

        if (item.tipo === 'cobrado') {
            totalMontoGeneral += item.monto;
            if (
                fechaItem.getDate() === ahora.getDate() &&
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalDiario += item.monto;
            }

            if (fechaItem >= inicioSemana && fechaItem < finSemana) {
                totalSemanal += item.monto;
            }

            if (
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalMensual += item.monto;
            }
        } else if (item.tipo === 'pendiente') {
            totalPendiente += item.monto;
        } else if (item.tipo === 'prestado') {
            totalPrestado += item.monto;
        } else if (item.tipo === 'recibido') {
            totalRecibido += item.monto;
        }
    });

    // Sumar ganancias semanales pagadas a los totales
    gananciasSemanales.forEach(item => {
        const fechaItem = new Date(item.fechaHora);
        
        if (item.estado === 'pagado') {
            totalMontoGeneral += item.monto;
            
            if (
                fechaItem.getDate() === ahora.getDate() &&
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalDiario += item.monto;
            }

            if (fechaItem >= inicioSemana && fechaItem < finSemana) {
                totalSemanal += item.monto;
            }

            if (
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalMensual += item.monto;
            }
        } else if (item.estado === 'pendiente') {
            totalPendiente += item.monto;
        }
    });

    document.getElementById('total-diario').innerText = `$${totalDiario.toFixed(2)}`;
    document.getElementById('total-semanal').innerText = `$${totalSemanal.toFixed(2)}`;
    document.getElementById('total-mensual').innerText = `$${totalMensual.toFixed(2)}`;
    document.getElementById('total-pendiente').innerText = `$${totalPendiente.toFixed(2)}`;
    document.getElementById('total-prestado').innerText = `$${totalPrestado.toFixed(2)}`;
    document.getElementById('total-recibido').innerText = `$${totalRecibido.toFixed(2)}`;
    actualizarMontoTotalActual();
    actualizarMontoEfectivo();
}

function actualizarCuentaRegresivaDia() {
    const ahora = new Date();
    const proximaMedianoche = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1);
    const proximoDomingo = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + (7 - ahora.getDay()));
    const proximoMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);
    const formatear = (elemento, destino, texto) => {
        if (!elemento) return;
        const segundosRestantes = Math.max(0, Math.ceil((destino.getTime() - ahora.getTime()) / 1000));
        const horas = Math.floor(segundosRestantes / 3600);
        const minutos = Math.floor((segundosRestantes % 3600) / 60);
        const segundos = segundosRestantes % 60;
        elemento.textContent = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        elemento.title = `Faltan ${horas} horas, ${minutos} minutos y ${segundos} segundos para cerrar ${texto}`;
    };
    formatear(cuentaRegresivaDia, proximaMedianoche, 'el día');
    formatear(cuentaRegresivaSemana, proximoDomingo, 'la semana');
    formatear(cuentaRegresivaMes, proximoMes, 'el mes');
}

actualizarCuentaRegresivaDia();
temporizadorCuentaRegresivaDia = setInterval(actualizarCuentaRegresivaDia, 1000);

window.editarGananciaSemanal = function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.editarGananciaSemanal(id, true));
        return;
    }
    const ganancia = gananciasSemanales.find(item => item.id === id);
    if (!ganancia) return;

    gananciaEnEdicion = ganancia;
    document.getElementById('input-estado-ganancia').value = ganancia.estado || 'pagado';
    document.getElementById('input-fecha-ganancia').value = ganancia.fechaHora.slice(0, 16);
    document.getElementById('input-descripcion-ganancia').value = ganancia.descripcion || '';
    checkboxEntrelazarDias.checked = Boolean(ganancia.entrelazarDias);
    checkboxMultiplesTrabajos.checked = Object.keys(ganancia.descripcionesPorDia || {}).length > 0;
    document.querySelectorAll('.checkbox-dia').forEach(checkbox => {
        checkbox.checked = ganancia.dias.includes(Number(checkbox.value));
    });
    actualizarSelectorDias();
    actualizarDescripcionesDias();

    if (checkboxMultiplesTrabajos.checked) {
        Object.entries(ganancia.descripcionesPorDia || {}).forEach(([dia, trabajos]) => {
            const listaTrabajos = Array.isArray(trabajos) ? trabajos : [{ descripcion: trabajos, monto: 0 }];
            const grupo = descripcionesDias.querySelector(`[data-dia-grupo="${dia}"]`);
            if (!grupo) return;

            const primerTrabajo = listaTrabajos[0] || { descripcion: '', monto: 0 };
            grupo.querySelector('.descripcion-dia-input').value = primerTrabajo.descripcion || '';
            grupo.querySelector('.precio-dia-input').value = Number.isFinite(Number(primerTrabajo.monto)) ? Number(primerTrabajo.monto).toFixed(2) : '';
            for (let indice = 1; indice < listaTrabajos.length; indice += 1) {
                grupo.querySelector('.btn-agregar-trabajo-dia').click();
                const inputs = grupo.querySelectorAll('.descripcion-dia-input');
                const precios = grupo.querySelectorAll('.precio-dia-input');
                inputs[inputs.length - 1].value = listaTrabajos[indice].descripcion || '';
                precios[precios.length - 1].value = Number.isFinite(Number(listaTrabajos[indice].monto)) ? Number(listaTrabajos[indice].monto).toFixed(2) : '';
            }
        });
        actualizarMontoDesglosado();
    } else {
        inputMontoGanancia.value = Number(ganancia.monto).toFixed(2);
    }

    textoGuardarGanancia.textContent = 'Guardar cambios';
    iconoGuardarGanancia.className = 'fa-solid fa-check';
    btnCancelarEdicionGanancia.hidden = false;
    modalAgregarGanancia.style.display = 'flex';
}

window.marcarPrestamoComoPagado = function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.marcarPrestamoComoPagado(id, true));
        return;
    }
    const prestamo = registros.find(registro => registro.id === id && registro.tipo === 'prestado');
    if (!prestamo || prestamo.estado === 'pagado') return;

    registroPendienteDePago = { registro: prestamo, estado: prestamo.estado };
    prestamo.estado = 'pagado';
    registroPendienteDeGuardar = prestamo;
    mostrarModalSeleccionarTarjeta();
}

window.marcarRecibidoComoPagado = function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.marcarRecibidoComoPagado(id, true));
        return;
    }
    const recibido = registros.find(registro => registro.id === id && registro.tipo === 'recibido');
    if (!recibido || recibido.estado === 'pagado') return;

    modoCobrarRecibido = true;
    registroPendienteDeGuardar = recibido;
    mostrarModalSeleccionarTarjeta();
}

window.marcarDeudaComoPagada = function(id, autorizado = false) {
    if (!autorizado) {
        solicitarSeguridadCalendario(() => window.marcarDeudaComoPagada(id, true));
        return;
    }
    const deuda = registros.find(registro => registro.id === id && registro.tipo === 'deuda');
    if (!deuda || deuda.estado === 'pagado') return;

    deudaEnReasignacion = null;
    registroPendienteDePago = { registro: deuda, estado: deuda.estado };
    deuda.estado = 'pagado';
    registroPendienteDeGuardar = deuda;
    mostrarModalSeleccionarTarjeta();
}

window.cambiarPagoDeuda = function(id) {
    const deuda = registros.find(registro => registro.id === id && registro.tipo === 'deuda');
    if (!deuda || deuda.estado !== 'pagado') return;

    deudaEnReasignacion = {
        origenTarjetaId: deuda.origenTarjetaId || null,
        origenEfectivo: Boolean(deuda.origenEfectivo),
        montoPagado: obtenerTotalAbonado(deuda) || Number(deuda.monto) || 0
    };
    registroPendienteDeGuardar = deuda;
    mostrarModalSeleccionarTarjeta();
}

normalizarBasesEdicion();
localStorage.setItem('registros_cobros', JSON.stringify(registros));
localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
localStorage.setItem('retiros_efectivo', JSON.stringify(retirosEfectivo));
localStorage.setItem('gastos_mios', JSON.stringify(gastosMios));
localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));

// La red no debe impedir el acceso con los datos locales.
cargaInicialSupabase = Promise.race([
    cargarDatosDesdeSupabase(),
    new Promise(resolve => setTimeout(resolve, 5000))
]).catch(error => {
    console.error('La carga inicial de Supabase no pudo completarse:', error);
});